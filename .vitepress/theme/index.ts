import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import YouTubeVideo from './YouTubeVideo.vue';
import Theme from 'vitepress/theme';
import './style.css';

// export default DefaultTheme;
export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp(ctx: any) {
        const { app } = ctx;
        app.component('YouTubeVideo', YouTubeVideo);
        Theme.enhanceApp(ctx);
    },
};
