// ดึงข้อมูลจาก URL
const urlParams = new URLSearchParams(window.location.search)
const playerName = urlParams.get("name")
const difficulty = urlParams.get("difficulty")

// แสดงข้อความทักทายในหน้าจอต้อนรับ
document.getElementById("playerNameDisplay").textContent = playerName
document.getElementById("difficultyDisplay").textContent = difficulty

// Set href attributes dynamically
const startGameLink = document.getElementById("start-game-link");
startGameLink.href = `game-play/game.html?name=${encodeURIComponent(playerName)}&difficulty=${encodeURIComponent(difficulty)}`;

const instructionsLink = document.getElementById("instructions-link");
instructionsLink.href = "instructions.html"; // Link to your instructions page

// จัดการปุ่มเริ่มเกม
// document.getElementById("start-button").addEventListener("click", function () {
  // เปลี่ยนเส้นทางไปยังหน้าเริ่มเกม
  // window.location.href = `game-play/game.html?name=${encodeURIComponent(playerName)}&difficulty=${difficulty}`
//});

/*// จัดการปุ่มคำแนะนำการเล่น
document.getElementById("instructions-button").addEventListener("click", function () {
  // เปลี่ยนเส้นทางไปยังหน้าคำแนะนำการเล่น
  window.location.href = `instructions.html?name=${encodeURIComponent(playerName)}&difficulty=${difficulty}`
});*/

/*// ฟังก์ชันสำหรับเริ่มเกม
function startGame() {
  alert("Starting the game...")
  // เปลี่ยนเส้นทางไปยังหน้าเกมหลักหรือโหลดเกม
  window.location.href = "game.html" // เปลี่ยนเป็นหน้าของเกมจริง ๆ
}

// ฟังก์ชันแสดงคำแนะนำการเล่น
function showInstructions() {
  alert("Here are the instructions for the game...")
  // สามารถเพิ่มการนำทางไปยังหน้าคำแนะนำหรือแสดงคำแนะนำในแบบป็อปอัพได้ที่นี่
  window.location.href = "instructions.html" // หรือแสดงในโหมดป็อปอัพ
}*/
