// Create your own supabase database using the provided seeds.sql file
const SUPABASE_URL = 'https://aqordevvnruktzytnrtm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxb3JkZXZ2bnJ1a3R6eXRucnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTc4ODUsImV4cCI6MTk2Nzg3Mzg4NX0.paVZTcltRhN61IqrwWNRAkNdX3pf7FOsHUYHh2DnJ_8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const response = await client.from('loving_families').select('*, fuzzy_bunnies(*)');
    if (response.error) {
        checkError(response);
    } else {
        return response.data;
    } 
}

export async function deleteBunny(id) {
    const response = await client.from('fuzzy_bunnies').delete().eq('id', id);
    if (response.error) {
        return checkError(response);
    } else {
        response.data;
    }
}

export async function createBunny(bunny, id) {
    // create a bunny using the bunny argument
    const response = await client.from('fuzzy_bunnies').insert(bunny, id);
    if (response.error) {
        checkError(response);
    } else {
        response.data;
    }
}

export async function createFamily(family) {
    const response = await client.from('loving_families').insert(family);
    if (response.error) {
        checkError(response);
    } else {
        response.data;
    }
}

// MARTHA STEWART (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
