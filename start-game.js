// ตรวจสอบว่าผู้เล่นกรอกชื่อหรือไม่
document.getElementById('start-button').addEventListener('click', function () {
  const playerName = document.getElementById('player-name').value.trim(); // ดึงค่าจากช่องกรอกชื่อ
  
  if (playerName === '') { // หากชื่อว่างเปล่า
    alert('Please enter your name before starting the game!'); // แจ้งเตือน
  } else {
    alert(`Welcome ${playerName}! Let's start the game!`); // หากกรอกชื่อสำเร็จ
    // ที่นี่สามารถเปลี่ยนหน้าไปยังหน้าหลักของเกม หรือเริ่มเกมได้
  }
});
