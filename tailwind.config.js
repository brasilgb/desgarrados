import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                "primary-dark": "#343434",
                "secundary-dark": "#637076",
                "primary-light": "#F8F8F8",
                "secundary-light": "#ECEFF0",
                "primary-red": "#D81D52",
                "secundary-red": "#ED527B",
                "primary-green": "#28B47E",
                "secundary-green": "#2CCE8F",
                "primary-yellow": "#FDAF2D",
                "secundary-yellow": "#FEC45E",
            },
            fontFamily: {
                Roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
                Courgette: ['Courgette', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'hero-image': "url('/images/campanha1.jpg')"
            },
        },
    },

    plugins: [forms],
};
