import { IconType } from 'react-icons';
import { FaEnvelopeOpenText, FaGithub, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import { uiText } from '../content/ui';

type ContactLinkProps = {
  href: string;
  ariaLabel: string;
  labelText: string;
  value: string;
  icon: IconType;
  external?: boolean;
};

function ContactLink({
  href,
  ariaLabel,
  labelText,
  value,
  icon: Icon,
  external = false,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      className="contact-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      <span className="contact-icon-badge" aria-hidden="true">
        <Icon className="contact-icon" />
      </span>
      <span className="contact-copy">
        <span className="contact-kicker">{labelText}</span>
        <span className="contact-value">{value}</span>
      </span>
    </a>
  );
}

function normalizePhoneHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

function formatExternalValue(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function ContactLinks({
  contact,
  variant,
}: {
  contact: {
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
  };
  variant: 'hero' | 'section';
}) {
  const className = variant === 'hero' ? 'hero-meta' : 'contact-list';

  return (
    <div className={className}>
      <ContactLink
        href={`mailto:${contact.email}`}
        ariaLabel={`${uiText.contactLabel}: ${contact.email}`}
        labelText={uiText.contactLabel}
        value={contact.email}
        icon={FaEnvelopeOpenText}
      />
      <ContactLink
        href={normalizePhoneHref(contact.phone)}
        ariaLabel={`${uiText.phoneLabel}: ${contact.phone}`}
        labelText={uiText.phoneLabel}
        value={contact.phone}
        icon={FaPhoneAlt}
      />
      <ContactLink
        href={contact.linkedIn}
        ariaLabel={`${uiText.linkedInLabel}: ${formatExternalValue(contact.linkedIn)}`}
        labelText={uiText.linkedInLabel}
        value={formatExternalValue(contact.linkedIn)}
        icon={FaLinkedinIn}
        external
      />
      <ContactLink
        href={contact.github}
        ariaLabel={`${uiText.githubLabel}: ${formatExternalValue(contact.github)}`}
        labelText={uiText.githubLabel}
        value={formatExternalValue(contact.github)}
        icon={FaGithub}
        external
      />
    </div>
  );
}
