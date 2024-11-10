"use server"

import { updatePostModerationStatus } from "../firebase/posts"
import { reportContent, Report as ReportType } from "../firebase/reports"
import { addSecurityLog } from "../firebase/security_log"
import { getAuthUser } from "../user"

async function _reportGeneric(contentID: string, flag: string, type: "post" | "comment") {
  try {
    const user = await getAuthUser()
    if (!user) {
      return { success: false, message: "You must be logged in to report a post" }
    }

    if (user.role === "admin") {
      // todo mark post as rejected directly
    }

    const newReport: ReportType = {
      flag: flag,
      status: "pending"
    }
    if (type === "post") {
      newReport.postID = contentID
    } else if (type === "comment") {
      newReport.commentID = contentID
    }
    else {
      throw new Error("Invalid type")
    }
    await reportContent(newReport)

    return { success: true, message: "Content reported successfully" }
  } catch (e) {
    console.error("unable to report content", e)
    return { success: false, message: "Unable to report content" }
  }
}

export async function reportPost(postID: string, flag: string) {
  return await _reportGeneric(postID, flag, "post")
}

export async function reportComment(commentID: string, flag: string) {
  return await _reportGeneric(commentID, flag, "comment")
}

async function _moderateGeneric(action: "approve" | "reject", contentID: string, type: "post" | "comment") {
  const user = await getAuthUser()
  if (!user || user.role !== "admin") {
    return {success: false, message: "you are not authorized to perform this action"}
  }

  if (type == "post") {
    await updatePostModerationStatus(contentID, action == "approve" ? "approved" : "rejected")
    await addSecurityLog({
      type_: "moderation_action",
      detail: `Post<id=${contentID}> ${action}d`
    })
  }
  return {success: true, message: "moderation status updated successfully"}
  // todo implement logic for comments
  // todo add security log
}

export async function approveContent(contentID: string, type: "post" | "comment") {
  return await _moderateGeneric("approve", contentID, type)
}

export async function rejectContent(contentID: string, type: "post" | "comment") {
  return await _moderateGeneric("reject", contentID, type)
}