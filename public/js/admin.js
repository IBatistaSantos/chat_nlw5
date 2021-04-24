const socket = io();

socket.on('admin_list_all_users', (connectios) => {
  console.log(connectios);
});
