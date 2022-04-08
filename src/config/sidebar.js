import { AppstoreOutlined, AuditOutlined, FileUnknownOutlined } from "@ant-design/icons";

export const documents = {
  size: 20,
  title: "Loại văn bản",
  icon: <FileUnknownOutlined />,
  key: "documents",
  data: [
    {
      key: "document-decision",
      title: "Quyết định",
      children: [],
      type: "decision",
    },
    {
      key: "document-resolution",
      title: "Nghị quyết",
      children: [],
      type: "resolution",
    },
    {
      key: "document-circulars",
      title: "Thông tư",
      children: [],
      type: "circulars",
    },
    {
      key: "document-directive",
      title: "Chỉ thị",
      children: [],
      type: "directive",
    },
    {
      key: "document-advertise",
      title: "Thông báo",
      children: [],
      type: "advertise",
    },
    {
      key: "document-lawAndOrdinance",
      title: "Luât - Pháp lệnh",
      children: [],
      type: "lawAndOrdinance",
    },
    {
      key: "document-7",
      title: "Kế hoạch",
      children: [],
      type: "decision",
    },
    {
      key: "document-regulations",
      title: "Quy định, quy chế",
      children: [],
      type: "regulations",
    },
    {
      key: "document-formsAndAppendices",
      title: "Biểu mẫu, phụ lục",
      children: [],
      type: "formsAndAppendices",
    },
    {
      key: "document-10",
      title: "Công văn, văn bản điều hành khác",
      children: [],
      type: "decision",
    },
  ],
};
export const agencies = {
  size: 20,
  title: "Cơ quan ban hành",
  icon: <AuditOutlined />,
  key: "agencies",
  data: [
    {
      key: "agency-government",
      title: "Chính phủ",
      children: [],
    },
    {
      key: "agency-ministryOfEducationAndTraining",
      title: "Bộ giáo dục và đạo tạo",
      children: [],
    },
    {
      key: "agency-scienceAndTechnology",
      title: "Bộ khoa học và công nghệ",
      children: [],
    },
    {
      key: "agency-4",
      title: "Hồi đồng chức danh Giáo sư nhà nước",
      children: [],
    },
    {
      key: "agency-5",
      title: "Bộ tài chính",
      children: [],
    },
    {
      key: "agency-6",
      title: "Bộ, ngành khác",
      children: [],
    },
    {
      key: "agency-7",
      title: "Ủy ban nhân dân tỉnh/thành phố",
      children: [],
    },
    {
      key: "agency-8",
      title: "Đại học Huế",
      children: [],
    },
    {
      key: "agency-9",
      title: "Đại học khoa học Huế",
      children: [],
    },
  ],
};

export const categories = {
  size: 20,
  title: "Chuyên mục",
  icon: <AppstoreOutlined />,
  key: "categories",
  data: [
    {
      key: "category-1",
      title: "Khoa học công nghệ",
      children: [],
    },
    {
      key: "category-2",
      title: "Hợp tác quốc tế",
      children: [],
    },
    {
      key: "category-3",
      title: "Công tác học sinh sinh viên",
      children: [],
    },
    {
      key: "category-4",
      title: "Đạo tạo đại học",
      children: [
        {
          key: "category-4.1",
          title: "Thông tin các học phần lý luận chính trị",
          children: [],
        },
        {
          key: "category-4.2",
          title: "Các mẫu giấy tờ khác",
          children: [],
        },
        {
          key: "category-4.3",
          title: "Các mẫu đơn liên quan đến điểm, học phần",
          children: [],
        },
        {
          key: "category-4.4",
          title: "Các mẫu đơn liên quan đến thực tập, thực tế",
          children: [],
        },
        {
          key: "category-4.5",
          title: "Các mẫu đơn liên quan đến tốt nghiệp",
          children: [],
        },
        {
          key: "category-4.6",
          title: "Các mẫu đơn liên quan đăng ký học phần",
          children: [],
        },
      ],
    },
    {
      key: "category-5",
      title: "Đào tạo sau đại học",
      children: [],
    },
    {
      key: "category-6",
      title: "Kế hoạch tài chính, cơ sở vật chất",
      children: [],
    },
    {
      key: "category-7",
      title: "Đảng ủy công đoàn",
      children: [],
    },
    {
      key: "category-8",
      title: "Hành chính tổng hợp",
      children: [],
    },
    {
      key: "category-9",
      title: "Khảo thí, đảm bảo chất lượng giáo dục",
      children: [
        {
          key: "category-9.1",
          title: "Biểu mẫu phúc khảo",
          children: [],
        },
        {
          key: "category-9.2",
          title: "Biểu mẫu chấm thi kết thúc học phần",
          children: [
            {
              key: "category-9.2.1",
              title: "Biểu mẫu tiểu luận",
              children: [],
            },
          ],
        },
        {
          key: "category-9.3",
          title: "Biểu mẫu đề/đáp án thi kết thúc học phần",
          children: [
            {
              key: "category-9.3.1",
              title: "Biểu mẫu trắc nghiệm",
              children: [],
            },
          ],
        },
        {
          key: "category-9.4",
          title: "Biểu mẫu ngân hàng câu hỏi thi/đề thi",
          children: [],
        },
        {
          key: "category-9.5",
          title: "Văn bản pháp quy",
          children: [],
        },
        {
          key: "category-9.6",
          title: "Lịch thị SDH",
          children: [],
        },
        {
          key: "category-9.7",
          title: "Lịch thi DH",
          children: [],
        },
      ],
    },
    {
      key: "category-10",
      title: "Tạp chí khoa học và công nghệ",
      children: [],
    },
    {
      key: "category-11",
      title: "Sở hữu trí tuệ",
      children: [],
    },
  ],
};

export const treePeople = [
  {
    title: "Tất cả mọi người",
    key: "everyone",
  },
  {
    title: "Tất cả giảng viên khoa công nghệ thông tin",
    key: "everyone-information-technology",
    children: [
      {
        title: "Trưởng khoa công nghệ thông tin",
        key: "information-technology-department-head",
      },
      {
        title: "Phó khoa công nghệ thông tin",
        key: "information-technology-deputy",
      },
      {
        title: "Nguyễn Dũng",
        key: "information-technology-1",
      },
      {
        title: "Nguyễn Ngọc Thuỷ",
        key: "information-technology-2",
      },
      {
        title: "Nguyễn Hoàng Hà",
        key: "information-technology-3",
      },
      {
        title: "Trần Nguyễn Phong",
        key: "information-technology-4",
      },
      {
        title: "Nguyễn Thị Bích Lộc",
        key: "information-technology-7",
      },
      {
        title: "Lê Văn Tường Lân",
        key: "information-technology-8",
      },
      {
        title: "Đoàn Thị Hồng Phước",
        key: "information-technology-9",
      },
    ],
  },
  {
    title: "Phòng Khảo thí và ĐBCLGD",
    key: "Testing-and-quality-assurance",
    children: [
      {
        title: "Child Node3",
        key: "0-0-0-",
      },
      {
        title: "Child Node4",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        key: "0-1-2",
      },
    ],
  },
];

export const categoriesTree = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
