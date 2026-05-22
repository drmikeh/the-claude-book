import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import YouTubeVideo from './YouTubeVideo.vue';
import './custom.css';

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp(ctx: any) {
        const { app } = ctx;
        app.component('YouTubeVideo', YouTubeVideo);
        DefaultTheme.enhanceApp(ctx);
    },
};
