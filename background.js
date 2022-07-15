chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
    // listener for tab opens
    if (changeInfo.status == 'complete') { 
        
        if (tab.url === "https://www.remessaonline.com.br/app/transferencia") {
            notification();
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
        if (tab.url === "https://huoya.parceiropetz.com.br/comprarAgora_Loja.html") {
            notification2();
            chrome.notifications.onClicked.addListener(onClickNotificationPetz2);   
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

    
