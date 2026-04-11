import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "URS79"

interface ContactConfirmationProps {
  name?: string
  subject?: string
}

const ContactConfirmationEmail = ({ name, subject }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {name ? `Hey ${name}, we got your message!` : 'We got your message!'}
        </Heading>
        {subject && (
          <Text style={subjectLine}>
            Re: {subject}
          </Text>
        )}
        <Text style={text}>
          Thanks for reaching out. Our team will review your message and get back to you as soon as possible.
        </Text>
        <Text style={text}>
          In the meantime, feel free to check out our latest releases and projects at{' '}
          <Link href="https://urs79.com" style={link}>urs79.com</Link>.
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          © {SITE_NAME} · Music · Creative · Distribution
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We received your message — URS79',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Alex', subject: 'Business inquiry' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Instrument Sans', Arial, sans-serif" }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '800' as const, color: '#d4a017', letterSpacing: '2px', margin: '0 0 24px' }
const divider = { borderColor: '#e5e5e5', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#111111', margin: '0 0 16px', lineHeight: '1.3' }
const subjectLine = { fontSize: '14px', color: '#666666', fontStyle: 'italic' as const, margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#333333', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#d4a017', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', textAlign: 'center' as const }
