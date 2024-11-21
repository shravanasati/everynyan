"use server"

import { updateCommentModerationStatus } from "@/lib/firebase/comments"
import { updatePostModerationStatus } from "@/lib/firebase/posts"
import { reportContent, Report as ReportType, resolveReport } from "@/lib/firebase/reports"
import { addSecurityLog } from "@/lib/firebase/security_log"
import { getAuthUser } from "@/lib/user"
import { discordWebhookReport } from "@/lib/discord"

async function _reportGeneric(postID: string, flag: string, type: "post" | "comment", commentID?: string) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return { success: false, message: "You must be logged in to report a post" }
    }

    if (user.role === "admin") {
      // todo mark post as rejected directly
    }

    const newReport: ReportType = {
      postID: postID,
      flag: flag,
      status: "pending"
    }

    if (type === "comment") {
      newReport.commentID = commentID
    }

    await reportContent(newReport)
    await discordWebhookReport({ type, commentID, postID, selectedFlag: flag });

    return { success: true, message: "Content reported successfully" }
  } catch (e) {
    console.error("unable to report content", e)
    return { success: false, message: "Unable to report content" }
  }
}

export async function reportPost(postID: string, flag: string) {
  return await _reportGeneric(postID, flag, "post")
}

export async function reportComment(postID: string, commentID: string, flag: string) {
  return await _reportGeneric(postID, flag, "comment", commentID)
}

async function _moderateGeneric(reportID: string, action: "approve" | "reject", postID: string, type: "post" | "comment", commentID?: string) {
  const user = await getAuthUser()
  if (!user || user.role !== "admin") {
    return { success: false, message: "you are not authorized to perform this action" }
  }

  if (type == "post") {
    await updatePostModerationStatus(postID, action == "approve" ? "approved" : "rejected")
    await addSecurityLog({
      type_: "moderation_action",
      detail: `Post<id=${postID}> ${action}d`
    })
  } else {
    await updateCommentModerationStatus(postID, commentID!, action == "approve" ? "approved" : "rejected")
    await addSecurityLog({
      type_: "moderation_action",
      detail: `Comment<id=${postID}> ${action}d`
    })
  }
  await resolveReport(reportID)
  return { success: true, message: "moderation status updated successfully" }
}

export async function approvePost(reportID: string, postID: string) {
  return await _moderateGeneric(reportID, "approve", postID, "post")
}

export async function rejectPost(reportID: string, postID: string) {
  return await _moderateGeneric(reportID, "reject", postID, "post")
}

export async function approveComment(reportID: string, postID: string, commentID: string) {
  return await _moderateGeneric(reportID, "approve", postID, "comment", commentID)
}

export async function rejectComment(reportID: string, postID: string, commentID: string) {
  return await _moderateGeneric(reportID, "reject", postID, "comment", commentID)
}