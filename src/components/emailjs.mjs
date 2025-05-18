export function emailJS() {
  emailjs.init('4bqjY7oGD8ufqYT0d'); // public key kamu

  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      Swal.fire({
        icon: 'error',
        title: 'Email tidak valid',
        text: 'Harap masukkan email yang benar.',
      });
      return;
    }

    if (!nama || !email || !pesan) {
      Swal.fire({
        icon: 'warning',
        title: 'Lengkapi semua kolom',
        text: 'Nama, email, dan pesan wajib diisi.',
      });
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    emailjs.send("service_7gpzaih", "template_o2rkl1g", {
      nama,
      email,
      pesan
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Terkirim!',
          text: 'Pesan berhasil dikirim.',
          showConfirmButton: false,
          timer: 2000
        });
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Pesan gagal dikirim. Silakan coba lagi.',
        });
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim";
      });
  });
}
