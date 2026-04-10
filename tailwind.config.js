export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold:  "#CDA268",
                blue:  "#305DC2",
                night: "#0A1C44",
            },
            keyframes: {
                kenburns1: {
                    from: { transform: "scale(1.08) translate(0px, 0px)" },
                    to:   { transform: "scale(1.0) translate(-8px, -4px)" },
                },
                kenburns2: {
                    from: { transform: "scale(1.08) translate(0px, 0px)" },
                    to:   { transform: "scale(1.0) translate(8px, 4px)" },
                },
                kenburns3: {
                    from: { transform: "scale(1.1) translate(0px, 4px)" },
                    to:   { transform: "scale(1.0) translate(-4px, 0px)" },
                },
                kenburns4: {
                    from: { transform: "scale(1.08) translate(4px, 0px)" },
                    to:   { transform: "scale(1.0) translate(0px, -4px)" },
                },
            },
            animation: {
                "kb-1": "kenburns1 8.5s ease-out forwards",
                "kb-2": "kenburns2 8.5s ease-out forwards",
                "kb-3": "kenburns3 8.5s ease-out forwards",
                "kb-4": "kenburns4 8.5s ease-out forwards",
            },
        },
    },
    plugins: [],
};