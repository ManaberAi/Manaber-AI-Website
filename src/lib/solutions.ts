import type { ComponentType, SVGProps } from 'react'

import type { BubbleTone } from '@/components/ui/BubbleCard'
import {
  BookIcon,
  BriefcaseIcon,
  CaptionsIcon,
  ChipIcon,
  CompassIcon,
  DownloadCloudIcon,
  GlobeIcon,
  MegaphoneIcon,
  MinbarIcon,
  PodiumIcon,
  ShieldIcon,
  UsersIcon,
  WaveformIcon,
} from '@/components/ui/Icon'

/* ---------------------------------------------------------------------------
 * SOLUTIONS — the content behind /solutions/:slug.
 *
 * Six rooms, one page template. Everything that differs between the six lives
 * in this file; `pages/SolutionDetail.tsx` renders any entry without knowing
 * which one it has. The slugs match the section ids on /use-cases, so a link
 * to `/use-cases#friday-sermons` and `/solutions/friday-sermons` always agree.
 *
 * CONTENT RULES (inherited from design_planning.md §8, non-negotiable):
 *   - Nothing here is invented. No testimonials, no client names, no case
 *     studies, no pricing, no awards, no latency or accuracy percentages.
 *   - The only real figures on this site are `+70% audience engagement` and
 *     `25+ languages`. No entry coins a new one.
 *   - The app has no public listing. Every call to action routes to /contact.
 *     Never a download prompt, a storefront reference or a launch date.
 *   - Every entry carries the differentiator: everything is processed on the
 *     device, and nothing leaves the phone.
 *
 * IMAGE RULE (design_planning.md §8.1): each `src` below is a LITERAL string,
 * byte-identical to the one it was copied from. Never rebuild one with a
 * template literal and never retype one by hand.
 * ------------------------------------------------------------------------ */

export type SolutionIcon = ComponentType<SVGProps<SVGSVGElement>>

export type SolutionSlug =
  | 'friday-sermons'
  | 'conferences'
  | 'business-meetings'
  | 'educational-sessions'
  | 'mosque-announcements'
  | 'team-meetings'

export type SolutionRow = {
  icon: SolutionIcon
  title: string
  body: string
}

export type Solution = {
  slug: SolutionSlug
  /** Short label for the mega-menu, the footer column and the page eyebrow. */
  navLabel: string
  /** One line, ~60 characters. Sits under the label in the mega-menu. */
  navDescription: string
  navIcon: SolutionIcon
  /** Document title for the route. */
  title: string
  heroHeadline: string
  /** The bold lead line under the headline. */
  heroStandfirst: string
  /** Secondary detail paragraph, set below the lead. */
  heroIntro: string
  /** Short claim carried on the bubble overlaid on the hero image. */
  heroBubble: string
  /** Fill for the hero overlay bubble. All three carry indigo text at ≥4.8:1. */
  accent: Extract<BubbleTone, 'periwinkle' | 'lavender' | 'lime'>
  image: {
    id: string
    src: string
    alt: string
    width: number
    height: number
  }
  checklist: {
    headline: string
    lead: string
    items: SolutionRow[]
  }
  steps: {
    headline: string
    lead: string
    items: { title: string; body: string }[]
  }
  cards: {
    headline: string
    lead: string
    items: { title: string; body: string }[]
  }
  /** One page-specific sentence on the shared on-device privacy slab. */
  privacyLine: string
  closing: {
    headline: string
    body: string
    panelTitle: string
    panelBody: string
  }
}

export const SOLUTIONS: readonly Solution[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'friday-sermons',
    navLabel: 'Friday Sermons',
    navDescription: 'The khutbah, followed line by line in every language present.',
    navIcon: MinbarIcon,
    title: 'Friday Sermons — Live Khutbah Translation | Manaber',
    heroHeadline: 'The khutbah, followed by everyone in the hall.',
    heroStandfirst:
      'Manaber captions the sermon as it is spoken and translates it live on each worshipper’s own phone, in the language they read most easily.',
    heroIntro:
      'In a great many congregations the khutbah is delivered in one language while the people listening hold a dozen between them. They attend every week, and every week they take away the tone of the sermon rather than its argument. No receivers to hand out, no channel to tune, no second speaker talking over the first.',
    heroBubble:
      'Every word is translated on the phone in the row. Nothing is transmitted, so nothing can be retained.',
    accent: 'periwinkle',
    image: {
      id: 'usecase-friday-sermon',
      src: 'https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_uzJElq0g-ojd4YY6.webp/img_uzJElq0g-ojd4YY6-1500x1125.webp',
      alt: 'A spacious mosque prayer hall filled with soft natural daylight',
      width: 1024,
      height: 768,
    },
    checklist: {
      headline: 'Nothing to install in the hall.',
      lead: 'The mosque changes nothing. The worshipper changes nothing but the language they read.',
      items: [
        {
          icon: CaptionsIcon,
          title: 'Nothing handed out at the door',
          body: 'No receivers, no headsets, no second sound system to run. Every listener uses the phone already in their pocket.',
        },
        {
          icon: GlobeIcon,
          title: 'One speaker, many languages',
          body: 'More than 25 languages, chosen individually on each device. The imam speaks once and the whole hall reads along.',
        },
        {
          icon: WaveformIcon,
          title: 'The row beside you is undisturbed',
          body: 'The translation is read, not heard. No second voice talks across the khutbah and no earpiece leaks into the next row.',
        },
        {
          icon: ChipIcon,
          title: 'Nothing leaves the phone',
          body: 'Listening, transcription and translation all happen on the device. The words of the sermon are never sent anywhere.',
        },
      ],
    },
    steps: {
      headline: 'Three steps, and none of them belong to the mosque.',
      lead: 'Everything the listener does happens before the imam has finished the opening.',
      items: [
        {
          title: 'Open the app in the hall',
          body: 'A worshipper opens Manaber where they are sitting. There is no account to create, no code to enter and nobody to ask.',
        },
        {
          title: 'Choose a language',
          body: 'Each person selects the language they read most easily, from more than 25. The choice is theirs, not the room’s.',
        },
        {
          title: 'Read along as it is spoken',
          body: 'Captions and translation appear while the imam is still speaking, so the argument lands in the moment rather than after it.',
        },
      ],
    },
    cards: {
      headline: 'Built for the rows, not for a datacentre.',
      lead: 'Four things that follow from running the whole pipeline on the device.',
      items: [
        {
          title: 'Register that fits a sermon',
          body: 'A khutbah does not read like a staff briefing. The translation follows the register of what is actually being spoken, so the sermon keeps its weight instead of arriving flattened.',
        },
        {
          title: 'Revisited later, offline',
          body: 'A downloaded sermon and its transcript stay on the phone and open again without a connection — useful in a basement hall, and useful again on the journey home.',
        },
        {
          title: 'A study circle or a full hall',
          body: 'Both are the same job, because each phone does its own work. There is no central system to queue behind and none to fail on a busy Friday.',
        },
        {
          title: 'Designed around congregations',
          body: 'Manaber was built for mosques first — for worshippers, imams and the volunteers who keep a jama’ah running week after week.',
        },
      ],
    },
    privacyLine:
      'A sermon is not data to be shipped to a datacentre. It is heard, translated and left on the phone that heard it.',
    closing: {
      headline: 'Bring the khutbah to the whole congregation.',
      body: 'Tell us about your mosque and we will show you what live on-device translation looks like in your hall — with nothing to install and nothing collected about the people listening.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your jama’ah, the languages in your rows and the week you would like to try it.',
    },
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'conferences',
    navLabel: 'Conferences & Seminars',
    navDescription: 'Live captions for an international audience, with no booth.',
    navIcon: PodiumIcon,
    title: 'Conferences & Seminars — Live Multilingual Captions | Manaber',
    heroHeadline: 'An international audience, and nobody choosing what to miss.',
    heroStandfirst:
      'Each attendee reads live captions in their own language on the phone already in their hand, while the speaker keeps their natural pace and delivery.',
    heroIntro:
      'An international audience is usually asked to choose between following the speaker and following the translation. One of the two always loses, and it is normally the part of the room that travelled furthest. With Manaber nothing has to be booked, wired or staffed.',
    heroBubble:
      'No booth at the back, no receivers at the door, and no connection required in the hall.',
    accent: 'lavender',
    image: {
      id: 'usecase-conference',
      src: 'https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_wrzRazbyt1sfh4-N.webp/img_wrzRazbyt1sfh4-N-1500x1125.webp',
      alt: 'An attentive audience seated in a modern conference auditorium facing a lit stage',
      width: 1024,
      height: 768,
    },
    checklist: {
      headline: 'The production budget stays where it was.',
      lead: 'Multilingual access without an interpreter booth, a receiver count or a second technical crew.',
      items: [
        {
          icon: CaptionsIcon,
          title: 'No booth, no receivers',
          body: 'Nothing to book, wire or staff at the back of the room, and nothing to collect and count again at the end of the day.',
        },
        {
          icon: GlobeIcon,
          title: 'A language per attendee',
          body: 'More than 25 languages, chosen on each phone rather than assigned to a channel. A delegation of one is served as well as a delegation of two hundred.',
        },
        {
          icon: WaveformIcon,
          title: 'The speaker keeps their pace',
          body: 'No pausing for an interpreter and no summarising between sentences. The talk on stage is the talk that was rehearsed.',
        },
        {
          icon: DownloadCloudIcon,
          title: 'Independent of the venue signal',
          body: 'Everything runs on the device, so the least reliable thing in the building has no say in whether the room can follow along.',
        },
      ],
    },
    steps: {
      headline: 'Nothing for the organiser to run.',
      lead: 'The whole arrangement happens in each attendee’s hand, in the minute before the session opens.',
      items: [
        {
          title: 'Open the app in the room',
          body: 'An attendee opens Manaber in their seat. No registration desk, no lanyard scan, no device to sign for.',
        },
        {
          title: 'Choose a language',
          body: 'Each delegate picks the language they read most easily, and can change it between sessions without telling anyone.',
        },
        {
          title: 'Read the session as it happens',
          body: 'Captions and translation appear while the speaker is still talking, so questions come from people who followed the whole argument.',
        },
      ],
    },
    cards: {
      headline: 'What a multi-track programme actually needs.',
      lead: 'Four capabilities that matter more in a long conference day than in a single talk.',
      items: [
        {
          title: 'Parallel tracks, no extra rig',
          body: 'Every room is served the same way, because the work happens on the phones inside it. Adding a track adds no hardware and no staffing.',
        },
        {
          title: 'Sessions kept for afterwards',
          body: 'Downloaded sessions and their transcripts remain on the device and open again without a connection, on the flight home as easily as in the hall.',
        },
        {
          title: 'A room of ten or a hall of thousands',
          body: 'Each phone does its own work, so audience size adds nothing to carry and there is no central system to fail during a keynote.',
        },
        {
          title: 'Meaning held together',
          body: 'A phrase is carried across as one unit, in the light of the words around it, so technical language and intent arrive intact rather than merely literal.',
        },
      ],
    },
    privacyLine:
      'An unpublished result or an embargoed announcement is processed and discarded on the device that heard it.',
    closing: {
      headline: 'Open the programme to the whole audience.',
      body: 'Tell us about your venue and your programme, and we will show you what live on-device translation looks like across your rooms — with nothing to wire and nothing collected about your delegates.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your event, the languages in the room and the sessions you would like covered.',
    },
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'business-meetings',
    navLabel: 'Business Meetings',
    navDescription: 'Cross-language discussion that stays inside the room.',
    navIcon: BriefcaseIcon,
    title: 'Business Meetings — On-Device Live Translation | Manaber',
    heroHeadline: 'The table keeps its pace, and its confidentiality.',
    heroStandfirst:
      'Manaber puts live translation on each participant’s phone, so the discussion keeps its own rhythm and everyone works from the same sentence rather than a summary of it.',
    heroIntro:
      'Cross-language discussion normally means slowing the room down for an interpreter, or accepting that part of the table is quietly guessing at the detail. Because processing happens on the device and nothing is transmitted, commercially sensitive conversation stays in the room it was held in.',
    heroBubble:
      'Commercially sensitive work stays in the room, and on the phone that heard it.',
    accent: 'lime',
    image: {
      id: 'usecase-business-meeting',
      src: 'https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_9ighliM4Ji9At_o5.webp/img_9ighliM4Ji9At_o5-1500x1125.webp',
      alt: 'A small diverse team seated around a light wood table in a bright meeting room',
      width: 1024,
      height: 768,
    },
    checklist: {
      headline: 'No third party at the table.',
      lead: 'The only people in the meeting are the people who were invited to it.',
      items: [
        {
          icon: ShieldIcon,
          title: 'Nothing transmitted',
          body: 'Audio and transcripts are processed on the phone and stay there. There is no upload to intercept and no transcript held on a server.',
        },
        {
          icon: WaveformIcon,
          title: 'The discussion keeps its pace',
          body: 'No pausing between sentences for a consecutive interpreter, and no waiting while an aside is relayed to half the table.',
        },
        {
          icon: GlobeIcon,
          title: 'A language per participant',
          body: 'More than 25 languages, chosen on each device, so a supplier, a client and a colleague can each read in their own.',
        },
        {
          icon: ChipIcon,
          title: 'No account, no trail',
          body: 'There is no sign-up, no email address and no identity attached to anything the app does — so there is no meeting history to request later.',
        },
      ],
    },
    steps: {
      headline: 'Ready before the agenda is opened.',
      lead: 'Nothing to provision, nothing for IT to approve, nothing to remove afterwards.',
      items: [
        {
          title: 'Open the app on the table',
          body: 'Each participant opens Manaber on the phone already sitting beside their notes. There is no room system to pair with.',
        },
        {
          title: 'Choose a language',
          body: 'Everyone selects the language they think in, privately, without announcing it to the room or asking anyone to accommodate them.',
        },
        {
          title: 'Work from the same sentence',
          body: 'Live translation follows the discussion as it moves, so a decision is taken by people who heard the same thing.',
        },
      ],
    },
    cards: {
      headline: 'Why it is usable for internal work.',
      lead: 'Four consequences of doing the whole job on the device rather than in a datacentre.',
      items: [
        {
          title: 'Confidentiality by architecture',
          body: 'The microphone feed is processed and discarded locally. Nothing is retained, so nothing can be leaked, subpoenaed or breached from a service you do not control.',
        },
        {
          title: 'Register that fits the room',
          body: 'A negotiation does not read like a lecture. The translation follows the register of what is being spoken, so the plain and the careful both arrive as they were meant.',
        },
        {
          title: 'The same in a boardroom or a site office',
          body: 'Each phone does its own work, so a meeting of four and a briefing of four hundred need exactly the same preparation: none.',
        },
        {
          title: 'Detail, not gist',
          body: 'A phrase is carried across in the light of the sentence around it, so the terms of an agreement survive the crossing instead of being approximated.',
        },
      ],
    },
    privacyLine:
      'A board meeting is not data to be shipped to a datacentre. It is processed where it is heard and left there.',
    closing: {
      headline: 'Let the whole table work at full speed.',
      body: 'Tell us about your team and the languages around your table, and we will show you what live on-device translation looks like in your meeting room — with nothing uploaded and nothing collected.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your organisation, the languages your people work in and the sessions you would like to try it on.',
    },
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'educational-sessions',
    navLabel: 'Educational Sessions',
    navDescription: 'Lectures students can follow, and revisit afterwards.',
    navIcon: BookIcon,
    title: 'Educational Sessions — Live Lecture Translation | Manaber',
    heroHeadline: 'Students follow the argument, not the vocabulary.',
    heroStandfirst:
      'Live captioning and translation let each student read along in the language they think in, at the pace the lecturer is actually speaking.',
    heroIntro:
      'In a class where students’ first languages differ, comprehension gaps compound quietly. A student spends the hour decoding vocabulary instead of following the argument, and the shortfall only shows up much later — in a seminar, or in an exam.',
    heroBubble:
      'A single hearing becomes something a student can study: downloaded sessions reopen offline.',
    accent: 'periwinkle',
    image: {
      id: 'usecase-education',
      src: 'https://app-5999.demo4.hubdesk.ai/api/studio/i/cover/1500x1125/i/enterprise/images-library/img_avlprNCPNKu92iII.webp/img_avlprNCPNKu92iII-1500x1125.webp',
      alt: 'Students seated in rows in a calm university lecture room lit by tall windows',
      width: 1024,
      height: 768,
    },
    checklist: {
      headline: 'Nothing added to the lecture theatre.',
      lead: 'No install on faculty machines, no hardware in the room, no accommodation a student has to request.',
      items: [
        {
          icon: CaptionsIcon,
          title: 'No hardware in the room',
          body: 'Nothing to fit to the lectern and nothing to hand out at the door. Each student uses the phone already on the desk.',
        },
        {
          icon: GlobeIcon,
          title: 'A language per student',
          body: 'More than 25 languages, chosen privately on each device — so nobody has to identify themselves as the person who needs help.',
        },
        {
          icon: DownloadCloudIcon,
          title: 'Revisited during revision',
          body: 'Downloaded sessions and transcripts reopen without a connection, which turns one hearing into something a student can work through again.',
        },
        {
          icon: ChipIcon,
          title: 'No record of who listened',
          body: 'Processing happens on the phone and nothing is uploaded, so there is no attendance trail and no profile of which student needed which language.',
        },
      ],
    },
    steps: {
      headline: 'The lecturer prepares nothing.',
      lead: 'The whole arrangement sits on the student’s side of the room, and takes about a minute.',
      items: [
        {
          title: 'Open the app at the desk',
          body: 'A student opens Manaber before the session begins. No account, no institutional sign-in, no request to the department.',
        },
        {
          title: 'Choose a language',
          body: 'Each student picks the language they read most easily, and can switch between a first language and the language of study at will.',
        },
        {
          title: 'Read along, then keep it',
          body: 'Captions follow the lecture live, and a downloaded session can be reopened later without a connection.',
        },
      ],
    },
    cards: {
      headline: 'What a teaching term actually needs.',
      lead: 'Four capabilities that matter across a semester rather than in a single hour.',
      items: [
        {
          title: 'Meaning, not substitution',
          body: 'A phrase is read as a phrase, with the sentence around it in view, so technical terms and emphasis arrive intact rather than merely literal.',
        },
        {
          title: 'A seminar or a lecture hall',
          body: 'A study circle of ten and a hall of several hundred are the same job, because every phone does its own work independently.',
        },
        {
          title: 'Register that fits teaching',
          body: 'A lecture keeps its clarity and a discussion keeps its informality, instead of both arriving flattened into the same voice.',
        },
        {
          title: 'Offline by default',
          body: 'Downloaded material stays on the device, so revision does not depend on campus wifi, a hall signal or a connection at home.',
        },
      ],
    },
    privacyLine:
      'No transcript of a class is uploaded, and no record is kept of which student read which language.',
    closing: {
      headline: 'Give every student the same hour.',
      body: 'Tell us about your institution and the languages in your rooms, and we will show you what live on-device translation looks like in a lecture — with nothing to install and nothing collected about your students.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your programme, the languages your students read and the sessions you would like covered.',
    },
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'mosque-announcements',
    navLabel: 'Mosque Announcements',
    navDescription: 'Notices after prayer that reach the whole community.',
    navIcon: MegaphoneIcon,
    title: 'Mosque Announcements — Live Community Notices | Manaber',
    heroHeadline: 'The notice after prayer reaches the whole community.',
    heroStandfirst:
      'Live captioning carries community notices to everyone present in the language they read, as they are being spoken.',
    heroIntro:
      'The notices given after prayer — a funeral, a new class, a change to the timetable, an appeal — are short, spoken once, and the most likely of all to be missed by exactly the people they concern. An announcement should reach the whole community rather than the part of it that shares the speaker’s language.',
    heroBubble:
      'Spoken once, read by everyone. No printed translation to prepare and nothing collected about who was there.',
    accent: 'lavender',
    image: {
      id: 'usecase-mosque-announcements',
      src: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?search_term=mosque,courtyard,community&img_prompt=Warm%20documentary%20photograph%20of%20a%20mosque%20courtyard%20after%20prayer%2C%20a%20small%20group%20of%20people%20standing%20and%20talking%20in%20soft%20late%20afternoon%20daylight.%20Neutral%20stone%20and%20sand%20tones%2C%20clean%20architectural%20lines%2C%20calm%20unhurried%20atmosphere.%20Shallow%20depth%20of%20field%2C%2050mm%2C%20respectful%20and%20candid&w=1500&h=1125&type=image',
      alt: 'People gathered and talking in a mosque courtyard in soft late afternoon daylight',
      width: 1500,
      height: 1125,
    },
    checklist: {
      headline: 'Short notices are the easiest thing to miss.',
      lead: 'A minute of speech, delivered once, to the part of the room least able to follow it.',
      items: [
        {
          icon: MegaphoneIcon,
          title: 'Spoken once, read by everyone',
          body: 'There is no second reading in another language and no printed sheet to prepare the night before.',
        },
        {
          icon: GlobeIcon,
          title: 'More than 25 languages',
          body: 'Each person reads the notice in the language they read most easily, chosen on their own phone.',
        },
        {
          icon: CaptionsIcon,
          title: 'Nothing to set up first',
          body: 'The same app that carried the khutbah carries the announcement that follows it. Nobody has to switch anything on.',
        },
        {
          icon: ChipIcon,
          title: 'Nothing recorded about who was there',
          body: 'Processing happens on the device. No attendance is counted, no profile is built and nothing is uploaded.',
        },
      ],
    },
    steps: {
      headline: 'It works because it is already open.',
      lead: 'The announcement lands in the same minute the app was already being used for the sermon.',
      items: [
        {
          title: 'The app is already in hand',
          body: 'Worshippers who followed the khutbah still have Manaber open when the notices begin. There is nothing to launch again.',
        },
        {
          title: 'The language is already chosen',
          body: 'Each person’s language was selected when they sat down, so the notice arrives in it without a further step.',
        },
        {
          title: 'The notice is read as it is given',
          body: 'Captions follow the speaker live, so a funeral time or a timetable change is understood before people stand up to leave.',
        },
      ],
    },
    cards: {
      headline: 'What community notices need that a sermon does not.',
      lead: 'Four things that matter when the message is short, practical and easy to lose.',
      items: [
        {
          title: 'Plain register, plainly carried',
          body: 'An announcement is not a sermon. The translation follows the register of what is spoken, so a practical notice stays direct instead of arriving ceremonial.',
        },
        {
          title: 'Detail that has to be exact',
          body: 'A date, a time and a place are carried in the light of the sentence around them, which is where a word-by-word substitution usually goes wrong.',
        },
        {
          title: 'Nothing for volunteers to run',
          body: 'No sheet to print, no translator to arrange and no equipment to unlock. The people keeping the mosque running have one less job.',
        },
        {
          title: 'Available again afterwards',
          body: 'Downloaded content reopens on the device without a connection, so somebody who stepped out can still catch what was said.',
        },
      ],
    },
    privacyLine:
      'Announcements concern a community, not a database. Nothing about who heard them is counted, stored or shared.',
    closing: {
      headline: 'Make sure the notice reaches everyone it concerns.',
      body: 'Tell us about your mosque and the languages in your community, and we will show you what live on-device translation looks like for the minute after prayer — with nothing to prepare and nothing collected.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your jama’ah, the notices you give each week and the languages your community reads.',
    },
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: 'team-meetings',
    navLabel: 'Team Meetings',
    navDescription: 'Stand-ups and briefings where nobody falls a step behind.',
    navIcon: UsersIcon,
    title: 'Team Meetings — Live Translation for Internal Sessions | Manaber',
    heroHeadline: 'Briefings where nobody falls a step behind.',
    heroStandfirst:
      'Manaber gives each person live translation on the phone already on the table, and keeps the whole session on the device.',
    heroIntro:
      'Stand-ups, briefings and handovers are quick and full of assumed context. On a multilingual team they are the easiest place for a colleague to fall a step behind and stay there — and the least likely place for anyone to ask for a sentence to be repeated.',
    heroBubble:
      'Fifteen minutes of assumed context, followed by everyone. Nothing uploaded, nothing kept.',
    accent: 'lime',
    image: {
      id: 'usecase-team-meetings',
      src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?search_term=team,standup,office&img_prompt=Small%20diverse%20team%20standing%20together%20around%20a%20wall-mounted%20screen%20in%20a%20bright%20modern%20workspace%2C%20soft%20window%20daylight.%20Muted%20neutral%20palette%20with%20a%20hint%20of%20green%2C%20minimal%20interior%2C%20focused%20collaborative%20mood.%20Documentary%20style%2C%20shallow%20depth%20of%20field&w=1500&h=1125&type=image',
      alt: 'A small diverse team standing together around a wall-mounted screen in a bright modern workspace',
      width: 1500,
      height: 1125,
    },
    checklist: {
      headline: 'Too short to interrupt, too important to miss.',
      lead: 'A fast internal session is exactly where a colleague quietly stops following and says nothing.',
      items: [
        {
          icon: WaveformIcon,
          title: 'No slowing the session down',
          body: 'A fifteen-minute stand-up stays fifteen minutes. Nobody has to pause for a relay or repeat a sentence for half the group.',
        },
        {
          icon: GlobeIcon,
          title: 'A language per colleague',
          body: 'More than 25 languages, chosen privately on each device, so nobody has to raise a hand to be accommodated.',
        },
        {
          icon: ShieldIcon,
          title: 'Usable for internal work',
          body: 'Roadmaps, incidents and personnel matters are processed on the device and never transmitted, which is what makes this usable inside the company.',
        },
        {
          icon: CompassIcon,
          title: 'Nothing to provision',
          body: 'No licences to assign, no room system to pair with and no account for anyone to create before the first session.',
        },
      ],
    },
    steps: {
      headline: 'Faster to start than the meeting itself.',
      lead: 'Three steps, all on the listener’s side, none of them requiring a decision from anyone else.',
      items: [
        {
          title: 'Open the app at the stand-up',
          body: 'Each person opens Manaber on the phone already in their hand. There is nothing to join and no link to circulate.',
        },
        {
          title: 'Choose a language',
          body: 'Everyone reads in the language they think in, and can change it between a briefing and a handover without telling anyone.',
        },
        {
          title: 'Keep up in real time',
          body: 'Live translation follows the session as it moves, so the handover is understood by the person taking it on.',
        },
      ],
    },
    cards: {
      headline: 'What internal sessions need most.',
      lead: 'Four capabilities that matter when the meeting is short, frequent and full of shorthand.',
      items: [
        {
          title: 'Context, not word-for-word',
          body: 'Internal shorthand rarely survives literal substitution. A phrase is carried across as a phrase, with the sentence around it in view.',
        },
        {
          title: 'Nothing kept about the team',
          body: 'No profile, no analytics on who listened and no history assembled about anybody in the room.',
        },
        {
          title: 'The same in every office',
          body: 'A team of four and an all-hands of four hundred are the same job, because each phone does its own work.',
        },
        {
          title: 'Register that fits a briefing',
          body: 'Direct, plain and brisk stays direct, plain and brisk — instead of arriving in the flattened voice of a generic translation.',
        },
      ],
    },
    privacyLine:
      'An internal briefing is processed and discarded on the device that heard it. There is no upload to intercept.',
    closing: {
      headline: 'Give every colleague the same fifteen minutes.',
      body: 'Tell us about your team and the languages your people work in, and we will show you what live on-device translation looks like in your internal sessions — with nothing to provision and nothing collected.',
      panelTitle: 'Talk to us',
      panelBody:
        'Write to us about your organisation, your team’s languages and the sessions you would like to try it on.',
    },
  },
] as const

/** Resolves a route param to an entry. Returns undefined for an unknown slug. */
export function getSolution(slug: string | undefined): Solution | undefined {
  if (!slug) return undefined
  return SOLUTIONS.find((solution) => solution.slug === slug)
}
