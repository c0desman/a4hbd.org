const SocialLink = ({ href, label, children }) => (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
    >
      <span className="sr-only">{label}</span>
      <div className="size-6">{children}</div>
    </a>
  );
  
  export default SocialLink;