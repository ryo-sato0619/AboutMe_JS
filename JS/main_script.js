import { createSupabaseClient } from './supabaseClient.js';

async function displaySkil() {
    const supabase = createSupabaseClient();

    try {
        let { data: skill, error } = await supabase
            .from('skill')
            .select('*');
        if (error) {
            console.error('Error fetching skill:', error);
            return;
        }

        window.skill = skill;
    }catch (err) {
        console.error('Error fetching skill:', err);  
    }
}

function showSKilLang() {
    const langSkilContainer = document.getElementById('lang-container');
    langSkilContainer.innerHTML = '';

    const langSkils = window.skill.slice();

    langSkils.forEach(skill => {
        const langDiv = document.createElement('div');
        langDiv.classList.add('skill');

        const langName = document.createElement('p');
        langName.textContent = skill.langName;

        const langExperience = document.createElement('p');
        langExperiecnce.textContent = skill.experience;

        langDiv.appendChild(langName);
        langDiv.appendChild(langExperience);
        langSkilContainer.appendChild(langDiv);
    });

    updatePagination();
}

window.onload = displaySkil;

