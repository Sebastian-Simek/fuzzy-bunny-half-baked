import { createFamily } from '../fetch-utils.js';

const familyInput = document.getElementById('add-family');

familyInput.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(familyInput);
    const newFamily = { name: data.get('name') };

    familyInput.reset();
    await createFamily(newFamily);
});