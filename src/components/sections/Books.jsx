import { motion } from "framer-motion";
import { useBooks } from "../../hooks/useBooks";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

function BookCard({ book, index }) {
    return (
        <motion.div
            className="flex flex-col md:flex-row gap-12 md:gap-20 items-center w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            {/* COVER */}
            <div className="flex-shrink-0">
                <img
                    src={book.cover_image}
                    alt={book.title}
                    className="shadow-2xl object-cover"
                    style={{
                        width: "clamp(200px, 22vw, 320px)",
                        height: "clamp(260px, 30vw, 420px)",
                        clipPath: "ellipse(50% 50% at 50% 50%)",
                    }}
                />
            </div>

            {/* TEXT */}
            <div className="flex flex-col gap-6 flex-1 text-center md:text-left">

                {/* AUTHOR */}
                <span
                    className="text-xs tracking-[0.4em] uppercase"
                    style={{ color: COLORS.night }}
                >
                    {book.author}
                </span>

                {/* TITLE */}
                <h2 className="text-white font-light tracking-widest uppercase"
                    style={{
                        fontSize: "clamp(26px, 3vw, 42px)",
                        lineHeight: 1.1,
                    }}
                >
                    {book.title}
                </h2>

                {/* LINE */}
                <motion.div
                    className="h-px"
                    style={{ backgroundColor: COLORS.night }}
                    initial={{ width: "40px" }}
                    whileInView={{ width: "120px" }}
                    transition={{ duration: 0.5 }}
                />

                {/* QUOTE */}
                <p
                    className="italic"
                    style={{
                        color: "rgba(255,255,255,0.6)",
                        maxWidth: "560px",
                    }}
                >
                    “{book.quote}”
                </p>

                {/* DESCRIPTION */}
                <p
                    className="leading-relaxed text-justify"
                    style={{
                        color: "rgba(255,255,255,0.75)",
                        maxWidth: "600px",
                    }}
                >
                    {book.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function Books() {
    const { books, loading, error } = useBooks();

    if (loading) return null;
    if (error) return null;

    return (
        <section
            id="books"
            style={{
                backgroundColor: COLORS.gold,
                paddingTop: "clamp(80px, 15vw, 200px)",
                paddingBottom: "clamp(80px, 15vw, 200px)",
            }}
            className="flex flex-col items-center px-8 md:px-16"
        >
            {/* HEADER */}
            <div className="w-full max-w-7xl flex flex-col gap-10">
                <motion.p
                    className="text-lg uppercase tracking-[0.4em] font-medium"
                    style={{ color: COLORS.night }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Le recueil
                </motion.p>

                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.night }}
                />
            </div>

            {/* CONTENT */}
            <div className="w-full max-w-7xl mt-16 flex flex-col gap-32">
                {books.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                ))}
            </div>
        </section>
    );
}