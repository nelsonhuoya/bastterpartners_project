var Cupom;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
    // listener for tab opens
    if (changeInfo.status == 'complete') { 
        
        if (tab.url === "https://www.remessaonline.com.br/app/transferencia") {
            notification2();
            chrome.notifications.onClicked.addListener(onClickNotificationRemessa);
        }
        if (tab.url.includes("amazon.com.br") && !tab.url.includes("tag=bastter-20") && !tab.url.includes("associados")) {
            chrome.cookies.get({ url: 'http://example.com', name: 'Bastter' },
                function (cookie) {
                    if (cookie) {
                   
                    } else {
                    notification();
                    chrome.notifications.onClicked.addListener(onClickNotificationAmazon);
                    }
                });
        }
        if (tab.url.includes("petz.com.br") && !tab.url.includes("huoya") && !tab.url.includes("manager")) {
            notification();
            chrome.notifications.onClicked.addListener(onClickNotificationPetz);
        }
        if (tab.url.includes("https://www.magazineluiza.com.br/")) {
            notification();
            chrome.notifications.onClicked.addListener(onClickNotificationMagazineLuiza);
        }
        if (tab.url === "https://huoya.parceiropetz.com.br/comprarAgora_Loja.html") {
            chrome.tabs.query({ 
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.scripting.executeScript({
                    function: () => document.querySelector('input[name = "cupomDesconto"]').value,
                    target: {tabId: tab[0].id}
                }, function (selection){
                    console.log(selection[0].result)
                    if(selection[0].result !== "15PARCEIROPETZ"){
                        notification2(),
                        chrome.notifications.onClicked.addListener(onClickNotificationPetz2);
                    }
                })
            });
            
        }
        if (tab.url === "https://sacola.magazinevoce.com.br/#/pagamento") {
            teste = 
            chrome.tabs.query({ 
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.scripting.executeScript({
                    function: () => document.getElementsByClassName("OrderReviewPackage")[document.getElementsByClassName("OrderReviewPackage").length-1].innerHTML,
                    target: {tabId: tab[0].id}
                }, function (vendedor){
                    console.log(vendedor[0].result)
                    if(vendedor[0].result.includes("Magalu")){
                        chrome.tabs.query({ 
                            currentWindow: true,
                            active: true
                        }, function (tab) {
                            chrome.scripting.executeScript({
                                function: () => document.getElementsByClassName("OrderReviewTotals-right")[0].innerHTML,
                                target: {tabId: tab[0].id}
                            }, function (selection){
                                console.log(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.'))
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 499.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 999.90){
                                    Cupom = '10HUOYA'
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 999.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 1499.90){
                                    Cupom ='20HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 1499.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 1999.90){
                                    Cupom = '30HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 1999.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 2499.90){
                                    Cupom = '40HUOYA'
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 2499.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 2999.90){
                                    Cupom = '50HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 2999.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 3499.90){
                                    Cupom = '60HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 3499.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 3999.90){
                                    Cupom='70HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 3999.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 4499.90){
                                    Cupom = '80HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 4499.90 && parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) < 4999.90){
                                    Cupom ='90HUOYA';
                                    notification3();
                                }
                                if(parseFloat(selection[0].result.replace('R$ ', '').replace('.', '').replace(',', '.')) > 4999.90){
                                    Cupom ='100HUOYA';
                                    notification3();
                                }
                            })
                        });;
                    }
                })
            });
        }
    }
    })



 function onClickNotificationRemessa() {
    chrome.tabs.query({ 
        currentWindow: true,
        active: true
    }, function (tab) {
        chrome.scripting.executeScript({
            files: ['injector2.js'],
            target: {tabId: tab[0].id}
        })
    });
}

function onClickNotificationAmazon() {
    chrome.tabs.query({ // change the tab url
        currentWindow: true,
        active: true
    }, function (tab) {
        chrome.tabs.update(tab.id, {
            url: tab[0].url + "?tag=bastter-20"
        });
        chrome.cookies.set({ url: "http://example.com/", name: "Bastter", value: "123", expirationDate: (new Date().getTime()/1000) + 60 *5});
    });
}  
function onClickNotificationMagazineLuiza() {
    chrome.tabs.query({ // change the tab url
        currentWindow: true,
        active: true
    }, function (tab) {
        chrome.tabs.update(tab.id, {
            url: tab[0].url.replace('https://www.magazineluiza.com.br/','https://www.magazinevoce.com.br/magazinehuoya/')
        });
    });
}
function onClickNotificationPetz() {
    chrome.tabs.query({ // change the tab url
        currentWindow: true,
        active: true
    }, function (tab) {
        chrome.tabs.update(tab.id, {
            url: tab[0].url.replace('www.petz.com.br','huoya.parceiropetz.com.br')
        });
    });
}    
function onClickNotificationPetz2() {
    chrome.tabs.query({ 
        currentWindow: true,
        active: true                                                                                                                                                            
    }, function (tab) {
        chrome.scripting.executeScript({
            files: ['injector.js'],
            target: {tabId: tab[0].id}
        })
    });
    
}
function notification() {
    chrome.notifications.create(
                {
                    title: 'Esse site é parceiro Bastter.com',
                    message: "Clique na notificação e ajude a Bastter.com",
                    iconUrl:'superpas.png',
                    type: 'basic',
                    priority: 2
                }
            )
}

function notification2() {
    chrome.notifications.create(
                {
                    title: 'A Bastter.com tem cupom nesse site',
                    message: "Clique na notificação e aplique nosso cupom",
                    iconUrl:'superpas.png',
                    type: 'basic',
                    priority: 2
                }
            )
}

function notification3() {
    chrome.notifications.create(
                {
                    title: 'A Bastter.com tem cupom nesse site',
                    message: "Insira o cupom "+ Cupom + " e ganhe " + Cupom.replace('HUOYA','') + " reais de desconto.",
                    iconUrl:'superpas.png',
                    type: 'basic',
                    priority: 2,
                    requireInteraction: true,
                }
            )
}

chrome.commands.onCommand.addListener( function(command) {
    if(command === "bastter-system"){
        chrome.tabs.create({ url: "https://bastter.com/bs" });
    }
});

chrome.commands.onCommand.addListener( function(command) {
    if(command === "bastter"){
        chrome.tabs.create({ url: "https://bastter.com/" });
    }
});

    
