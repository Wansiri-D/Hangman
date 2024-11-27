// ดึงข้อมูลจาก URL
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get("name");
const difficulty = urlParams.get("difficulty");

// แสดงข้อความทักทายในหน้าจอต้อนรับ
document.getElementById("playerNameDisplay").textContent = playerName;
document.getElementById("difficultyDisplay").textContent = difficulty;

// ฟังก์ชันสำหรับเริ่มเกม
function startGame() {
  alert("Starting the game...");
  // ที่นี่คุณสามารถเปลี่ยนเส้นทางไปยังหน้าเกมหลักหรือโหลดเกม
  window.location.href = "game.html"; // เปลี่ยนเป็นหน้าของเกมจริง ๆ
}

// ฟังก์ชันแสดงคำแนะนำการเล่น
function showInstructions() {
  alert("Here are the instructions for the game...");
  // คุณสามารถเพิ่มการนำทางไปยังหน้าคำแนะนำหรือแสดงคำแนะนำในแบบป็อปอัพได้ที่นี่
  window.location.href = "instructions.html"; // หรือแสดงในโหมดป็อปอัพ
}
