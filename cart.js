import { sendCart } from "./api.js"; // นำเข้า `sendCart` จากไฟล์ `api.js` สำหรับส่งข้อมูลการสั่งซื้อไปยังเซิร์ฟเวอร์
import { renderEta } from "./eta.js"; // นำเข้า `renderEta` จากไฟล์ `eta.js` สำหรับแสดงเวลาคาดการณ์การส่งสินค้า

const cartSection = document.querySelector(".cart"); // เลือกองค์ประกอบ HTML ที่มีคลาส `cart` ซึ่งเป็นส่วนของตะกร้าสินค้า
const etaSection = document.querySelector(".eta"); // เลือกองค์ประกอบ HTML ที่มีคลาส `eta` สำหรับแสดงเวลา ETA (เวลาประมาณการถึง)
const cartItems = document.querySelector(".cart-items"); // เลือกองค์ประกอบ HTML ที่มีคลาส `cart-items` สำหรับแสดงรายการสินค้าในตะกร้า
const cartSum = document.querySelector("#cart-sum"); // เลือกองค์ประกอบ HTML ที่มี ID `cart-sum` สำหรับแสดงยอดรวมราคาสินค้าในตะกร้า
const buyButton = document.querySelector("#buy-button"); // เลือกปุ่ม HTML ที่มี ID `buy-button` สำหรับสั่งซื้อสินค้า

let cart = []; // ตัวแปรที่เก็บรายการสินค้าในตะกร้า
let cartToSend = []; // ตัวแปรที่เก็บ ID ของสินค้าที่จะส่งไปยังเซิร์ฟเวอร์

//Rendera varukorgen
export function renderCart(cart, cartToSend) { // ฟังก์ชันสำหรับแสดงรายการสินค้าในตะกร้า
    cartItems.innerHTML = ""; // ล้างรายการสินค้าในตะกร้าทั้งหมดก่อนเริ่มการแสดงผลใหม่
    let total = []; // ตัวแปรเก็บยอดรวมราคาของสินค้าแต่ละรายการ
    cart.forEach((item) => { // วนลูปแสดงผลสินค้าทีละรายการ
        const itemContainer = document.createElement("div"); // สร้าง div สำหรับแสดงข้อมูลสินค้า
        const itemTilteContainer = document.createElement("div"); // สร้าง div สำหรับชื่อสินค้า
        const itemTitle = document.createElement("h3"); // สร้าง h3 สำหรับชื่อสินค้า
        const itemPrice = document.createElement("h3"); // สร้าง h3 สำหรับราคาสินค้า
        const dotBox = document.createElement("div"); // สร้าง div ที่ใช้จัดรูปแบบ
        const quantityContainer = document.createElement("div"); // สร้าง div สำหรับแสดงจำนวนสินค้า
        const plusButton = document.createElement("button"); // สร้างปุ่มเพิ่มจำนวนสินค้า
        const minusButton = document.createElement("button"); // สร้างปุ่มลดจำนวนสินค้า
        const quantity = document.createElement("p"); // สร้าง p สำหรับแสดงจำนวนสินค้าในรูปข้อความ

        dotBox.classList.add("dot-box"); // เพิ่มคลาส `dot-box` ให้กับ div
        itemContainer.classList.add("item-container"); // เพิ่มคลาส `item-container` ให้กับ div
        quantity.classList.add("quantity"); // เพิ่มคลาส `quantity` ให้กับ p
        plusButton.classList.add("quantity-buttons"); // เพิ่มคลาส `quantity-buttons` ให้กับปุ่มเพิ่มสินค้า
        minusButton.classList.add("quantity-buttons"); // เพิ่มคลาส `quantity-buttons` ให้กับปุ่มลดสินค้า

        itemTitle.innerText = item.name.toUpperCase(); // กำหนดชื่อสินค้าเป็นตัวพิมพ์ใหญ่
        itemPrice.innerText = item.price * item.quantity + " SEK"; // คำนวณราคา * จำนวน และเพิ่มหน่วยเงิน "SEK"
        plusButton.innerText = "+"; // ใส่ข้อความ "+" ในปุ่มเพิ่มสินค้า
        minusButton.innerText = "-"; // ใส่ข้อความ "-" ในปุ่มลดสินค้า
        quantity.innerText = item.quantity + " stycken"; // แสดงจำนวนสินค้า พร้อมหน่วย "stycken" (ชิ้น)
        total.push(item.price * item.quantity); // เพิ่มราคาสินค้าในตัวแปรยอดรวม

        cartItems.append(itemContainer); // เพิ่ม div สินค้าในส่วน cart-items
        itemContainer.append(itemTilteContainer, quantityContainer); // ใส่ชื่อและปริมาณใน div สินค้า
        itemTilteContainer.append(itemTitle, dotBox, itemPrice); // ใส่ชื่อสินค้าและราคาใน div
        quantityContainer.append(plusButton, quantity, minusButton); // ใส่ปุ่มเพิ่ม ลด และจำนวนใน div

        plusButton.addEventListener("click", () => plusItem(item)); // กำหนดให้ปุ่มเพิ่มสินค้าเรียกฟังก์ชัน `plusItem`
        minusButton.addEventListener("click", () => removeItem(item)); // กำหนดให้ปุ่มลดสินค้าเรียกฟังก์ชัน `removeItem`
    });

    if (cartToSend.length === 0) { // ตรวจสอบว่าตะกร้าส่งไปยังเซิร์ฟเวอร์ว่างหรือไม่
        buyButton.classList.add("empty"); // เพิ่มคลาส `empty` ให้กับปุ่มถ้าว่าง
    } else {
        buyButton.classList.remove("empty"); // ลบคลาส `empty` ออกจากปุ่มถ้าไม่ว่าง
    }

    cartSum.innerText = total.reduce((a, b) => a + b, 0) + " SEK"; // คำนวณยอดรวมราคาทั้งหมด และแสดงใน cart-sum
}

//Knappar för mängd

function removeItem(item) { // ฟังก์ชันสำหรับลดจำนวนหรือเอาสินค้าออกจากตะกร้า
    const index = cartToSend.indexOf(item.id); // หาตำแหน่ง ID สินค้าใน `cartToSend`
    const cartIndex = cart.indexOf(item); // หาตำแหน่งสินค้าใน `cart`
    if (item.quantity > 1) { // ถ้าจำนวนสินค้ามากกว่า 1
        item.quantity--; // ลดจำนวนสินค้าใน cart
        cartToSend.splice(index, 1); // ลบ ID สินค้า 1 ชิ้นใน cartToSend
    } else { // ถ้าจำนวนสินค้าเหลือ 1
        cartToSend.splice(index, 1); // ลบ ID สินค้าออกจาก cartToSend
        cart.splice(cartIndex, 1); // ลบสินค้านั้นออกจาก cart
    }
    renderCart(cart, cartToSend); // อัพเดตการแสดงผลตะกร้า
    console.log(cart, cartToSend); // แสดงผลใน console สำหรับดีบัก
}

function plusItem(item) { // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้าในตะกร้า
    item.quantity++; // เพิ่มจำนวนสินค้า
    cartToSend.push(item.id); // เพิ่ม ID สินค้าใน `cartToSend`
    renderCart(cart, cartToSend); // อัพเดตการแสดงผลตะกร้า
    console.log(cart, cartToSend); // แสดงผลใน console สำหรับดีบัก
}

buyButton.addEventListener("click", async () => { // เพิ่ม Event Listener สำหรับคลิกปุ่มซื้อสินค้า
    if (cartToSend.length === 0) { // ถ้าตะกร้าไม่มีสินค้า
        console.log("listan är tom"); // แสดงข้อความใน console ว่าตะกร้าว่าง
    } else { // ถ้ามีสินค้าในตะกร้า
        const order = await sendCart(cartToSend); // ส่งรายการสินค้าไปยังเซิร์ฟเวอร์ด้วยฟังก์ชัน `sendCart` และรอผลลัพธ์
        renderEta(order); // เรียกใช้ฟังก์ชัน `renderEta` เพื่อแสดงข้อมูลการส่งสินค้า
        etaSection.classList.toggle("hidden"); // ซ่อนหรือแสดงส่วน ETA
        cartSection.classList.add("hidden"); // ซ่อนส่วนตะกร้าสินค้า
    }
});

export { cart, cartToSend }; // ส่งออกตัวแปร `cart` และ `cartToSend` สำหรับใช้ในไฟล์อื่น
