const { mockDocumentListProtect } = require("mocks/documents");

const listToData = [];
for (let i = 0; i < 40; i++) {
  listToData.push(
    {
      name: "Nguyễn Mạnh Tuấn",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
    {
      name: "Nguyễn Mạnh Hải",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
    {
      name: "Nguyễn Tuấn Tài",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
    {
      name: "Nguyễn Tuấn Anh",
      email: `email.receiver.${i}@husc.edu.vn`,
    }
  );
}

export const mockDocumentListSent = [];
for (let i = 0; i < mockDocumentListProtect.length; i++) {
  if (mockDocumentListProtect[i].isProtect) {
    mockDocumentListSent.push({
      key: mockDocumentListProtect[i].key,
      sentDate: "10:10 PM 20/09/2022",
      title: mockDocumentListProtect[i].title,
      summary: mockDocumentListProtect[i].summary,
      urgentLevel: mockDocumentListProtect[i].urgentLevel,
      isRead: mockDocumentListProtect[i].isRead,
      publisher: {
        name: mockDocumentListProtect[i].treeProcessing[0].name,
      },
      from: {
        name: mockDocumentListProtect[i].treeProcessing[0].name,
      },
      to: listToData,
    });
  }
}
