# Document management client

# Người dùng thông thường không cần đăng nhập

Khi ngươì dùng truy cập vào domain name như này /
Người dùng sẽ được chuyển tới trang tra cứu văn bản.
Giao diện sẽ được hiển thị gồm 2 phần chính:

1. Danh sách các văn bản được sắp xếp mới nhất theo ngày ban hành và các văn bản được thỉ hiện ở đây là các văn công khai
2. Bộ lọc và tìm kiếm

Bộ lọc: ta có lọc theo chuyên mục, loại văn bản, cơ quan banh hành
Khi ta chọn vào một trong 3 hoặc cũng có thể là cả 3 thì danh sách sẽ hiển thị theo các lựa chọn tương ứng của người dùng

Tìm kiếm:

1. Tìm trong khoản thời gian
   Người dùng sẽ chọn tìm theo ngày ban hành hoặc là ngày cập nhật tiếp đến là chọn từ ngày nào đến ngày nào đó và người dụng nhấn tìm kiếm thì danh sách sẽ trả về công thông tin tương ứng

2. Tìm kiếm thông thường
   Tìm kiếm theo tiêu đề hoặc số hiệu văn bản hoặc có thế là cả hai tiếp theo người dùng nhập thông tin vào và nhấn tìm kiếm.

Người dùng có thể kết hợp cả hai tìm kiếm trong khoảng ngày và tìm kiếm theo thông tin nhận vào và cũng có thế kết hợp với các bộ lọc như đã nói ở trên

Mỗi phần tử trong dánh sách sẽ hiển thị các thông tin cơ bản như ... và người dùng có thể chọn xem trước để mo văn bản ở một tab mới và tải xuống về máy

Khi người dùng bấm vào một phần tử trong danh sách

Hệ thống sẽ chuyển sang trang chưa thông tin chi tiết của văn bản đó
gồm các tab

1. Thuộc tính
   là bao gồm các thông tin của văn bản như ...

2. Văn bản gốc
   Thường sẽ là file mà người ban hành tải lên, vì đã số văn bản thường lưu hành dười dạng các file pdf và word

3. Văn bản liên quan
   Là môt danh sách văn bản liên quan đến văn bản này, hiển tại là hiển thị các văn bản có liên quan mà chưa đề cập đến mối quan hệ giữ chúng là gì

# Người dùng cần đăng nhập (Cán bộ, Giảng Viên)

Người dùng chọn vào tài khoản ở phần Header. Hệ thông sẽ chuyển người dùng đến trang đăng nhập

Sau khi đăng nhập thành công hệ thông sẽ đưa người dùng đến trang dashboard

Trang này sẽ hiển thị tổng quát các thông tin như số văn bản đã nhận, ...
và danh sách các thông báo ở bên dưới
Về thông báo sẽ có 2 loại thông báo

1. Ai đó đã gửi văn bản đến bạn
2. Ai đó thao tác lên văn bản mà bạn đang theo dõi đó như:

- Phản hồi một thông tin bất kì
- Xứ lý văn bản
- Chuyển tiếp văn bản

Tra cứu văn bản về cơ bản thì sẽ tương tự như khi người dùng không đăng nhập, điểm khác biệt ở đây là da danh sách văn bản được hiển thị ở đây là bao gồm các văn bản công khai và các văn bản bí mật, riêng tư.
Các văn bản riêng tư này được ban hành từ người ban hành và chuyển tiếp từ người khác.

Văn bản đến
Sẽ hiển thị ra danh sách tất cả các văn bản được gửi đến người dùng
Các văn bản nào mà người dùng chưa xứ lý sẽ hiển thị màu nên đậm hơn.
Ngoài ra cũng có thể sắp lại danh sách văn bản đến này như chưa xử lý để lọc ra danh sách các văn bản nào mà người dùng chưa xử lý tương tự cho lựa chọn sắp xếp đã xử lý sẽ hiện thị các văn bản đã xử lý
Khi người dùng chọn vào một phần tử trong danh sách này

1. Là một văn bản chưa đọc hệ thống chuyển hướng người dùng đến trang thông tin chi tiết của văn bản đó
Trong trang này gồm 6 tab
3 tab: Thuoc tính, văn bản gốc, văn bản liên quan sẽ tương tự người dùng không cần đăng nhập

- Phân tích: tab này sẽ hiển thị biểu đồ tròn để đứa ra cái nhìn tổng quát về người đã xứ lý và người chưa xứ lý và bên dưới là danh sách các người dùng liên quan đến văn bản nói trên

- Cây xử lý
