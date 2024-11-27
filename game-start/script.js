// ดึงปุ่มเลือกระดับความยากทั้งหมด
const difficultyButtons = document.querySelectorAll(".difficulty");

// ดักจับการกดปุ่มเลือกระดับความยาก
difficultyButtons.forEach(button => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้นของปุ่ม (เช่น การส่งฟอร์ม)

    // ลบคลาส active ออกจากปุ่มทั้งหมด
    difficultyButtons.forEach(btn => btn.classList.remove("active"));

    // เพิ่มคลาส active ให้ปุ่มที่ถูกคลิก
    this.classList.add("active");

    // เซ็ตค่าระดับความยากใน input ซ่อน
    document.getElementById("difficulty").value = this.dataset.difficulty;
  });
});

// ดักจับการส่งฟอร์ม
document.getElementById("gameForm").addEventListener("submit", function (event) {
  event.preventDefault(); // ป้องกันการรีเฟรชหน้าจอ

  const playerName = document.getElementById("playerName").value; // ดึงชื่อผู้เล่น
  const difficulty = document.getElementById("difficulty").value; // ดึงระดับความยาก

  // ตรวจสอบว่าผู้เล่นกรอกข้อมูลครบถ้วน
  if (playerName.trim() === "" || difficulty === "") {
    alert("Please enter your name and select a difficulty level.");
    return;
  }

  // แสดงข้อความต้อนรับ
  /*alert(`Welcome, ${playerName}! You have selected ${difficulty} difficulty.`);*/

  // เปลี่ยนเส้นทางไปหน้าจอยินดีต้อนรับ
  window.location.href = `welcome.html?name=${encodeURIComponent(playerName)}&difficulty=${difficulty}`;
});
