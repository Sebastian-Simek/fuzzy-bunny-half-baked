import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
async function displayFamilies() {
    
    const families = await getFamilies();
    
    familiesEl.textContent = '';
    
    for (let family of families) {
        const div = document.createElement('div');
        div.textContent = family.name;
        div.classList.add('family');
       
        const bunnyUl = document.createElement('ul');

        for (let bunny of family.fuzzy_bunnies) {
            const li = document.createElement('li');
            li.textContent = bunny.name;
            li.classList.add('bunny');
            
            li.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                await displayFamilies();
            });
            
            
            bunnyUl.append(li);  
            div.append(bunnyUl);
        }
        familiesEl.append(div,);
    }
}
displayFamilies();

