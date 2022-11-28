
// Web elements locators
export const mainWidgetIframeLocator = 'iframe[id="podium-modal"]';
export const contantButtonIframeLocator = 'iframe[id="podium-bubble"]';

export const openCloseChatWidgetLocator = 'button[id="podium-website-widget-button"]';
export const backToLocationsButtonLocator = 'button[aria-label="back"]';

export const selectLocationsModalLocator = 'div.LocationSelector'
export const messageModalLocator = 'div[id="ComposeMessage"]';
export const nameInputFieldLocator = 'input[id="Name"]';
export const phoneNumberInputFieldLocator = 'input[id="Mobile Phone"]';
export const textMessageFieldLocator = 'textarea[id="Message"]';

// Web elements data and properties
export const introMessage = {
    locator: '.SendSmsPage__TextInvitation',
    textAndDate: 'intro message - 2022-03-09'    
}

export const stores = {
    Bountiful: {
        name: 'Scoreboard Sports - Bountiful',
        address: '1402 E Main St, Lehi, UT 84043, United States'
    },
    Narnia: {
        name: 'Scoreboard Sports - Narnia',
        address: '6680 Little Cottonwood Canyon Rd, Sandy, UT 84092, United States'
    },
    Orem: {
        name: 'Scoreboard Sports - Orem',
        address: '765 West State Road, American Fork, UT 84003, United States'
    }
}

export const legal = {
    linkText: 'use is subject to terms',
    linkUrl: 'https://www.podium.com/acceptable-use-policy/',
    consentTextLocator: 'p.Legal__text'
}