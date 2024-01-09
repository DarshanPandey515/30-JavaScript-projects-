const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const symbols = '!@#$%^&*()_+{}[];:"<>,.?/~`';
const numbers = '0123456789';

const passLength = document.getElementById('pass-len');
const submitBtn = document.getElementById('submit-btn');
const displayPassElement = document.getElementById('generatedPass');
displayPassElement.style.fontSize = '13px';
displayPassElement.innerHTML = 'Password will be generated here!';


const allChars = upperCase + lowerCase + symbols + numbers;


function generatePassword(length) {
    let password = '';

    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += upperCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * symbols.length)];
    password += upperCase[Math.floor(Math.random() * numbers.length)];

    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    displayPassElement.textContent = password;


}



submitBtn.addEventListener('click', async () => {
    generatePassword(passLength.value);
})




const copyContent = async () => {
    try {
        let text = document.getElementById('generatedPass').innerHTML;
        await navigator.clipboard.writeText(text);
        alert('Password Copied Successfully.');
        displayPassElement.innerHTML = 'Password will be generated here!';
        passLength.value = '';

    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}
