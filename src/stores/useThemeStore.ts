import { defineStore } from 'pinia';
export const useThemeStore = defineStore('themeStore', {
    state: () => ({
        theme: {
            // backgroundColor: '#fff'
            buttonPrimaryBackground: "rgb(0, 73, 144)",
            buttonPrimaryColor: "#fff",
            buttonPrimaryBorderColor: "rgb(0, 73, 144)",
            navBarBackground: "rgb(0, 73, 144)",
            navBarTitleTextColor: "#fff"
        }
    })
})