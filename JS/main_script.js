console.log("JavaScriptファイルが読み込まれました"); // デバッグ用

import { createSupabaseClient } from './supabase_client.js';

window.onload = function() {
    console.log("Window loaded fully"); // デバッグ用

    const pageUrl = window.location.pathname;
    console.log("Current page URL:", pageUrl); 

    //資格ページなら
    if (pageUrl.includes('certification')) {
        console.log("Certification page detected"); 
        //資格ページ情報を表示
        displayCert();
    }
    //スキル・経験ページなら
    else if (pageUrl.includes('skil')) {
        console.log("Skill page detected"); 
        //スキル・経験情報を表示
        displaySkill();
    }

    //certificationテーブルから情報を取得して表示する非同期関数
    async function displayCert() {
        const supabase = await createSupabaseClient();
        try{
            let {data, error } =await supabase.from('certification').select('*');
            console.log('Supabase Data:', data); // デバッグ用
            console.log('Supabase Error:', error); // デバッグ用

            if (error) {
                console.error('Error fetching certification:',error);
                return;
            }

            window.cert = data;
            showPageCert();
        //エラーなら
        } catch(err) {
            console.error('Unexpected error:', err);
        }
    }

    function showPageCert(){
        const certContainer = document.getElementById('cert-container');
        certContainer.innerHTML="";
        
        window.cert.forEach(cert => {
            //資格名
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.classList.add('cert-td1');
            nameCell.textContent = cert.name;
            row.appendChild(nameCell);
            //取得時期
            const dateCell = document.createElement('td');
            dateCell.classList.add('cert-td2');
            dateCell.textContent = cert.date;
            row.appendChild(dateCell);
            //関連スキル
            const skillCell = document.createElement('td');
            skillCell.classList.add('cert-td2');
            skillCell.textContent = cert.conn;
            row.appendChild(skillCell);

            certContainer.appendChild(row);

        });
    }

        //skillテーブルから情報を取得して表示する非同期関数
    async function displaySkill() {
        const supabase = await createSupabaseClient();
        try{
            let {data, error } =await supabase.from('skill').select('*');
            console.log('Supabase Data:', data); // デバッグ用
            console.log('Supabase Error:', error); // デバッグ用

            if (error) {
                console.error('Error fetching certification:',error);
                return;
            }

            window.skill = data;
            showPageSkill();
        //エラーなら
        } catch(err) {
            console.error('Error: One or more container elements not found');
        }
    }

    function showPageSkill(){
        const langContainer = document.getElementById('lang-container');
        const dbContainer = document.getElementById('db-container');
        const osContainer = document.getElementById('os-container');

        // デバッグ用に各コンテナが取得できているか確認
        console.log('lang-container:', langContainer);
        console.log('db-container:', dbContainer);
        console.log('os-container:', osContainer);

        // コンテナが取得できない場合、エラーメッセージを表示して処理を中断
        if (!langContainer) {
            console.error('Error: lang-container element not found');
        }
        if (!dbContainer) {
            console.error('Error: db-container element not found');
        }
        if (!osContainer) {
            console.error('Error: os-container element not found');
        }
        

        langContainer.innerHTML="";
        dbContainer.innerHTML="";
        osContainer.innerHTML="";
        
        window.skill.forEach(skill => {
            let container;

            switch (skill.category) {
                case 'lang':
                    container = langContainer;
                    break;
                case 'DB':
                    container = dbContainer;
                    break;
                case 'OS':
                    container = osContainer;
                    break;
                default:
                    return;
            }


            //スキル名
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.classList.add('skill-td1');
            nameCell.textContent = skill.name;
            row.appendChild(nameCell);
            //使用期間
            const experienceCell = document.createElement('td');
            experienceCell.classList.add('skill-td2');
            experienceCell.textContent = skill.experience + 'ヶ月';
            row.appendChild(experienceCell);

            container.appendChild(row);

        });
    }
};