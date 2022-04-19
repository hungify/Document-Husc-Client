import { mockDocumentListProtect } from "mocks/documents";

export const mockDocumentListInbox = [];
for (let i = 0; i < mockDocumentListProtect.length; i++) {
  if (mockDocumentListProtect[i].isProtect) {
    mockDocumentListInbox.push({
      key: mockDocumentListProtect[i].key,
      sentDate: "10:10 PM 20/09/2022",
      title: mockDocumentListProtect[i].title,
      summary: mockDocumentListProtect[i].summary,
      urgentLevel: mockDocumentListProtect[i].urgentLevel,
      isRead: mockDocumentListProtect[i]?.isRead,
      from: {
        name: mockDocumentListProtect[i].treeProcessing[0].name,
      },
    });
  }
}
