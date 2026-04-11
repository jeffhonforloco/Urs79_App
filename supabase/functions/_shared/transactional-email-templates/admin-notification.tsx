import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "URS79"

interface AdminNotificationProps {
  type?: string
  name?: string
  email?: string
  subject?: string
  message?: string
  artistName?: string
  releaseTitle?: string
  submissionId?: string
}

const AdminNotificationEmail = ({
  type, name, email, subject, message, artistName, releaseTitle, submissionId,
}: AdminNotificationProps) => {
  const isSubmission = type === 'submission'
  const heading = isSubmission ? '🎵 New Music Submission' : '📩 New Contact Form Message'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{heading} — {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>{SITE_NAME} ADMIN</Text>
          <Hr style={divider} />
          <Heading style={h1}>{heading}</Heading>

          {isSubmission ? (
            <>
              {artistName && (
                <Section style={field}>
                  <Text style={label}>Artist</Text>
                  <Text style={value}>{artistName}</Text>
                </Section>
              )}
              {releaseTitle && (
                <Section style={field}>
                  <Text style={label}>Release</Text>
                  <Text style={value}>{releaseTitle}</Text>
                </Section>
              )}
              {submissionId && (
                <Section style={field}>
                  <Text style={label}>Submission ID</Text>
                  <Text style={value}>{submissionId}</Text>
                </Section>
              )}
            </>
          ) : (
            <>
              {name && (
                <Section style={field}>
                  <Text style={label}>From</Text>
                  <Text style={value}>{name} ({email})</Text>
                </Section>
              )}
              {subject && (
                <Section style={field}>
                  <Text style={label}>Subject</Text>
                  <Text style={value}>{subject}</Text>
                </Section>
              )}
              {message && (
                <Section style={field}>
                  <Text style={label}>Message</Text>
                  <Text style={messageText}>{message}</Text>
                </Section>
              )}
            </>
          )}

          <Hr style={divider} />
          <Text style={footer}>
            This is an automated admin notification from {SITE_NAME}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AdminNotificationEmail,
  subject: (data: Record<string, any>) =>
    data.type === 'submission'
      ? `New submission: ${data.releaseTitle || 'Untitled'} — ${data.artistName || 'Unknown'}`
      : `New contact: ${data.subject || 'No subject'} — from ${data.name || 'Unknown'}`,
  displayName: 'Admin notification',
  previewData: {
    type: 'contact',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    subject: 'Distribution partnership',
    message: "Hey, I'd love to discuss a distribution deal for my upcoming EP.",
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Instrument Sans', Arial, sans-serif" }
const container = { padding: '40px 24px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '14px', fontWeight: '700' as const, color: '#d4a017', letterSpacing: '3px', margin: '0 0 24px' }
const divider = { borderColor: '#e5e5e5', margin: '24px 0' }
const h1 = { fontSize: '20px', fontWeight: '700' as const, color: '#111111', margin: '0 0 20px', lineHeight: '1.3' }
const field = { margin: '0 0 16px' }
const label = { fontSize: '11px', fontWeight: '600' as const, color: '#999999', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '0 0 4px' }
const value = { fontSize: '15px', color: '#333333', margin: '0' }
const messageText = { fontSize: '14px', color: '#333333', margin: '0', lineHeight: '1.6', backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }
const footer = { fontSize: '11px', color: '#999999', margin: '0', textAlign: 'center' as const }
