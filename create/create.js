import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const select = document.getElementById('family-id');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // get the name and family id from the form
    const newBunny = {
        name: data.get('bunny-name'),
        family_id: data.get('family-id')
    };
    form.reset();
    createBunny(newBunny);
    
});

window.addEventListener('load', async () => {
    const families = await getFamilies();

    for (let family of families) {
        const option = document.createElement('option');
        option.value = family.id;
        option.textContent = family.name;
        select.append(option);
    }
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
