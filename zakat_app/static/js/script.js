document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Payer (Add/Edit) ---
    const payerModal = document.getElementById('payer-modal');
    const addPayerBtn = document.getElementById('add-payer-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const payerForm = document.getElementById('payer-form');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    const formFields = {
        name: document.getElementById('name'),
        address: document.getElementById('address'),
        amount: document.getElementById('amount'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone')
    };

    const openModal = () => payerModal.style.display = 'flex';
    const closeModal = () => payerModal.style.display = 'none';

    addPayerBtn.addEventListener('click', () => {
        payerForm.action = '/payers/add';
        modalTitle.textContent = 'Tambah Pembayar Baru';
        modalDescription.textContent = 'Isi formulir di bawah ini untuk menambahkan pembayar zakat baru.';
        payerForm.reset();
        clearValidationMessages();
        openModal();
    });

    document.querySelectorAll('.edit-payer-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const tr = e.currentTarget.closest('tr');
            const payer = tr.dataset;
            
            payerForm.action = `/payers/edit/${payer.id}`;
            modalTitle.textContent = 'Ubah Pembayar';
            modalDescription.textContent = `Anda sedang mengubah informasi untuk ${payer.name}.`;
            
            formFields.name.value = payer.name;
            formFields.address.value = payer.address;
            formFields.amount.value = payer.amount;
            formFields.email.value = payer.email;
            formFields.phone.value = payer.phone;

            clearValidationMessages();
            openModal();
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // --- Modal Delete ---
    const deleteModal = document.getElementById('delete-modal');
    const deleteForm = document.getElementById('delete-form');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    const openDeleteModal = () => deleteModal.style.display = 'flex';
    const closeDeleteModal = () => deleteModal.style.display = 'none';

    document.querySelectorAll('.delete-payer-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const tr = e.currentTarget.closest('tr');
            const payerId = tr.dataset.id;
            deleteForm.action = `/payers/delete/${payerId}`;
            openDeleteModal();
        });
    });

    cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    // --- Close modal on overlay click ---
    window.addEventListener('click', (e) => {
        if (e.target === payerModal) closeModal();
        if (e.target === deleteModal) closeDeleteModal();
    });

    // --- Toast Notifications ---
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    });

    // --- Client-side Validation ---
    function validateField(field, message, condition) {
        const validationMessage = field.nextElementSibling;
        if (condition) {
            validationMessage.textContent = message;
            field.setAttribute('aria-invalid', 'true');
            return false;
        }
        validationMessage.textContent = '';
        field.setAttribute('aria-invalid', 'false');
        return true;
    }

    function clearValidationMessages() {
        document.querySelectorAll('.validation-message').forEach(el => el.textContent = '');
        Object.values(formFields).forEach(field => field.setAttribute('aria-invalid', 'false'));
    }

    payerForm.addEventListener('submit', (e) => {
        let isValid = true;
        isValid &= validateField(formFields.name, 'Nama wajib diisi (minimal 2 karakter).', formFields.name.value.length < 2);
        isValid &= validateField(formFields.address, 'Alamat wajib diisi (minimal 5 karakter).', formFields.address.value.length < 5);
        isValid &= validateField(formFields.amount, 'Jumlah zakat harus angka positif.', !formFields.amount.value || parseFloat(formFields.amount.value) <= 0);
        isValid &= validateField(formFields.email, 'Format email tidak valid.', formFields.email.value && !/^\S+@\S+\.\S+$/.test(formFields.email.value));
        isValid &= validateField(formFields.phone, 'Nomor telepon minimal 10 digit.', formFields.phone.value && formFields.phone.value.length < 10);
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}); 