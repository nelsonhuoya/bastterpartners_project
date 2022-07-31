document.getElementById('redeem-code').value = 'bastterblue';

var onChange = new Event('change');
document.getElementById('redeem-code').dispatchEvent(onChange);

var onFocus = new Event('focus');
document.getElementById('redeem-code').dispatchEvent(onFocus);

document.getElementsByClassName("newSignup-validate")[0].click();