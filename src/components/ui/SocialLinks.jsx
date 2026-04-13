import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const FA_ICONS = {
    instagram: faInstagram,
    facebook:  faFacebook,
};

export default function SocialLink({ link }) {
    return (

    <a    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.name}
    className="
    w-10 h-10 rounded-full
    flex items-center justify-center
    border border-white/20 text-white/60
    transition-all duration-300
    "
    style={{ cursor: "pointer" }}
          onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#CDA268";
              e.currentTarget.style.boxShadow = `
    0 0 8px  rgba(205,162,104,0.7),
    0 0 20px rgba(205,162,104,0.4)
  `;
              e.currentTarget.style.borderColor = "#CDA268";
              e.currentTarget.style.color       = "white";
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.boxShadow       = "";
              e.currentTarget.style.borderColor     = "";
              e.currentTarget.style.color           = "";
          }}
>
<FontAwesomeIcon icon={FA_ICONS[link.icon]} className="w-5 h-5" />
        </a>
);
}