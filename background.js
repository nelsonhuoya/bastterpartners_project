chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
    // listener for tab opens
    if (changeInfo.status == 'complete') { 
        
        if (tab.url === "https://www.remessaonline.com.br/app/transferencia") {
            notification2();
            browser.notifications.onClicked.addListener(onClickNotificationRemessa);
        }
        if (tab.url.includes("amazon.com.br") && !tab.url.includes("tag=bastter-20") && !tab.url.includes("associados")) {
            browser.cookies.get({ url: 'http://example.com', name: 'Bastter' },
                function (cookie) {
                    if (cookie) {
                   
                    } else {
                    notification();
                    browser.notifications.onClicked.addListener(onClickNotificationAmazon);
                    }
                });
        }
        if (tab.url.includes("petz.com.br") && !tab.url.includes("huoya") && !tab.url.includes("manager")) {
            notification();
            browser.notifications.onClicked.addListener(onClickNotificationPetz);
        }
        if (tab.url === "https://huoya.parceiropetz.com.br/comprarAgora_Loja.html") {
            browser.tabs.query({ 
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.tabs.executeScript(tab[0].id,{
                    file:"injector3.js",
                }, function(selection) {
                    console.log(selection[0])
                    if (selection[0] !== "15PARCEIROPETZ") {
                        notification2(),
                        chrome.notifications.onClicked.addListener(onClickNotificationPetz2);
                    } 
                });
            });
            
        }
    }
    })



 function onClickNotificationRemessa() {
    browser.tabs.query({ 
        currentWindow: true,
        active: true
    }, function (tab) {
        browser.scripting.executeScript({
            files: ['injector2.js'],
            target: {tabId: tab[0].id}
        })
    });
}

function onClickNotificationAmazon() {
    browser.tabs.query({ // change the tab url
        currentWindow: true,
        active: true
    }, function (tab) {
        browser.tabs.update(tab.id, {
            url: tab[0].url + "?tag=bastter-20"
        });
        browser.cookies.set({ url: "http://example.com/", name: "Bastter", value: "123", expirationDate: (new Date().getTime()/1000) + 60 *5});
    });
}  
function onClickNotificationPetz() {
    browser.tabs.query({ // change the tab url
        currentWindow: true,
        active: true
    }, function (tab) {
        browser.tabs.update(tab.id, {
            url: tab[0].url.replace('www.petz.com.br','huoya.parceiropetz.com.br')
        });
    });
}  
function onClickNotificationPetz2() {
    browser.tabs.query({ 
        currentWindow: true,
        active: true                                                                                                                                                            
    }, function (tab) {
        browser.scripting.executeScript({
            files: ['injector.js'],
            target: {tabId: tab[0].id}
        })
    });
    
}
function notification() {
    browser.notifications.create(
                {
                    title: 'Esse site é parceiro Bastter.com!!!!',
                    message: "\nClique na notificação e ajude a Bastter.com",
                    type: 'progress',
                    priority: 2
                }
            )
}

function notification2() {
    browser.notifications.create(
                {
                    title: 'A Bastter.com tem cupom nesse site',
                    message: "\nClique na notificação e aplique nosso cupom",
                    type: 'basic',
                    priority: 2
                }
            )
}

browser.commands.onCommand.addListener( function(command) {
    if(command === "bastter-system"){
        browser.tabs.create({ url: "https://bastter.com/bs" });
    }
});

browser.commands.onCommand.addListener( function(command) {
    if(command === "bastter"){
        browser.tabs.create({ url: "https://bastter.com/" });
    }
});

    
