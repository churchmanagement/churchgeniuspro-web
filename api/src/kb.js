// Knowledge base for the AI chat assistant.
// Generated from the official ChurchGeniusPro User Manual + site pricing data.
// Regenerate when the manual or pricing changes.

'use strict';

const KNOWLEDGE_BASE = `# ChurchGeniusPro Knowledge Base (from the official User Manual)

## Getting Started

### Overview
Welcome to Church Genius Pro! This chapter helps you log in for the first time, find your way around, and learn the basics that apply to every type of user.

### What is Church Genius Pro?
Church Genius Pro is an online platform that helps your church run smoothly. From one place, your team can manage members and families, track giving, plan events, organise ministries, communicate with the congregation, and much more. Members can also log in to view their own information and stay involved.

### Who uses the app?
Different people see different things based on their role. The most common roles are:
• Administrator — the person responsible for running the system day-to-day.
• Pastor / Ministry Leader — leads ministries, organises events, and follows up with members.
• Accountant — records income and expenses and produces financial reports.
• Volunteer — helps with ministries, events, kids ministry, prayer team, and so on.
• Member — a regular church member with a personal account.
• Parent / Child — parents check kids into Sunday school; children can access classes and activities.
Don't worry if more than one role applies to you — the system supports linked accounts, and you can switch between them without logging out.

### Logging in for the first time
• Open your web browser and go to the church's Church Genius Pro web address.
• Enter the username and password your administrator gave you.
• Click Sign In. The first screen you see is your Dashboard — a customisable home page that shows the information most useful to your role.
Tip: If you forget your password, click the "Forgot Password?" link on the login page. You'll receive a reset email within a few minutes.

### Finding your way around
The main parts of every page are:
• Top bar — shows the church name, your profile menu, and the logout button.
• Side menu (left) — your main navigation. The items you see depend on your role and permissions.
• Main area — where the page content appears.
To open a section, click its name in the side menu. Sections with a small arrow (▶) contain sub-pages — click to expand.
Note: If a menu item you expect to see is missing, you may not have permission for it. Ask your administrator to grant access.

### Logging out and session safety
For security, the app automatically logs you out after 30 minutes of inactivity. To log out manually, click your profile picture in the top right and choose Logout.
Tip: If you share a computer with others (for example, in a church office), always log out before walking away.

## Administrator Guide

### Overview
This chapter is for the person who manages the application for your church — usually the Church Administrator or a senior staff member. As an Administrator, you create user accounts, set permissions, manage families and groups, and configure the system for everyone else.

### Managing user accounts
Every staff member, ministry leader, and church member who needs to log in must have a user account. You can create them one at a time from the Users page in the side menu.
Adding a new user
• Open the Users page from the side menu.
• Click "+ Add User".
• Enter the person's name, email, and phone number.
• Choose a role from the dropdown (see roles below).
• Click Save. The new user receives an email invitation with a link to set their password.
Default roles
Church Genius Pro comes with five built-in roles. You can use them as-is or fine-tune the permissions:
Customising permissions
Inside each user's profile, you'll find a Permissions tab. Tick the boxes for what they should be able to do — for example, "View Reports," "Manage Events," "Send Emails," or "Manage Contributions." Untick to revoke. Changes save instantly.
Tip: Start by giving people the standard role, then adjust only what doesn't fit. This avoids missing important defaults.

### Adding families and members
Why families?
Church Genius Pro organises people into families/households. This helps you send one email to a whole household, track contributions per family, and keep relationships clear (head of household, spouse, children).
Adding a family
• Open Families from the side menu.
• Click "+ Add Family".
• Fill in the first family member — usually the head of household. Set their role to "Head" and enter contact details.
• Click "+ Add Member" to add a spouse, children, or other relatives. For each, choose a role (Wife, Son, Daughter, Father, etc.) and fill in their information.
• Click Save. The family appears in your list and is searchable everywhere in the system.
Note: You can edit a family any time by clicking its name. Members marked "Inactive" stay in the system but are excluded from active member lists.

### Groups and group emails
Groups let you organise members for specific purposes — worship team, men's ministry, youth, prayer team, Bible studies, and so on. From a group you can send emails, post announcements, and message members.
Creating a group
• Open Groups from the side menu.
• Click "+ Add Group" and give it a name (e.g., "Sunday Worship Team").
• Add members by typing names — the picker searches your family directory.
• Save. You can now email the whole group from inside the group page.

### Membership applications
When someone applies to become a member through your church's online form, the application appears in the Membership Requests page.
• Open Membership Requests from the side menu.
• Review each application. Click the applicant's name to see their full details.
• Click Approve to add them as a member (their family record is created automatically) or Reject with a brief reason.
• The applicant receives an email letting them know the outcome.

### Email preferences and unsubscribes
Some members may unsubscribe from your emails. The Unsubscribed List page shows everyone who has opted out so you can respect their preference. From the same page you can re-subscribe a member if they ask to start receiving emails again.

### Stripe Integration (Online Giving)
Connecting Stripe enables online donations, event payments, and recurring giving. You only need to do this once.
• Open Stripe Integration from the side menu.
• Click Connect to Stripe.
• Sign in with your church's Stripe account (or create one if needed).
• Approve the connection. You'll be returned to Church Genius Pro with a green "Connected" badge.
Tip: Your treasurer should be the one to set up Stripe so payouts go to the correct church bank account.

## Pastor & Ministry Leader Guide

### Overview
This chapter is for pastors and anyone who leads a ministry — worship, prayer, youth, kids, outreach, hospitality, and so on. You'll use the Meetings, Events, Ministry, Prayer, and Communication features the most.

### Scheduling meetings
Use Meetings for recurring church gatherings — Sunday service, midweek prayer, leadership team, small groups.
Creating a meeting
• Open Meetings from the General section of the side menu.
• Click "+ Add Meeting".
• Choose a meeting type (Sunday Service, Bible Study, Prayer, etc.). If you don't see the right type, create one from Meeting Categories.
• Set the date and start/end times.
• Choose how often it repeats: One-time, Daily, Weekly, or Monthly. For weekly meetings, tick which days of the week. For monthly, choose either a specific day (e.g., the 15th) or a pattern (e.g., the first Sunday).
• Add the location — either pick from a member's saved address or type a new one.
• Optionally upload a flyer image.
• Click Save. The meeting is added to your calendar and reminders will go out automatically based on your reminder schedule.
Tip: Old one-time meetings are auto-deleted after 90 days to keep the calendar clean. If you want to keep one, tick "Do not auto-delete" when editing.

### Planning events
Events are different from meetings — they're typically one-off gatherings open to registration, like a Christmas service, picnic, retreat, or fundraiser.
Creating an event
• Open Events from the General menu.
• Click "+ Add Event".
• Fill in the event name, type (In-Person, Online, Hybrid), date and times.
• Add address and host details.
• Set a registration deadline if you want online RSVPs.
• Tick "Generate QR Code" if you want a code for entry/check-in at the door.
• Tick "Allow Self Check-in" so attendees can check themselves in by scanning the QR code on their phone.
• Add food and accommodation options if applicable.
• Click Save. A public registration link is generated — share it on your website, bulletin, or social media.
Managing event volunteers
Inside any event, click Volunteers to see, add, and message helpers.
• Search the member directory to add volunteers from your roster.
• Click "+ Add Manually" to add someone who isn't (yet) a member.
• Assign roles like "Greeter," "Setup Crew," or "Sound Tech."
• Email or text all volunteers at once with one click.

### Ministries & Groups
Ministries are ongoing teams that serve a purpose — Worship Team, Outreach, Hospitality, Children's Ministry, and so on. They show up under General → Ministry and are managed similarly to groups.

### Prayer Ministry
The Prayer Ministry page is a hub for prayer requests, volunteer prayer warriors, and follow-ups.
Adding a prayer request
• Open Prayer Requests from the General menu.
• Click + Add Main Section to create top-level categories like "Healing," "Family," "Salvation."
• Expand a section and click + Add Prayer Request.
• Enter a short title (e.g., "Sarah's surgery"), a description, and who requested it.
• Choose a status: New, Assigned, In Progress, Following Up, Answered, or Closed.
• Optionally assign one or more volunteers from your prayer team.
• Save.
Managing prayer volunteers
• On the Prayer Requests page, click 👥 Manage Volunteers.
• Use the search box to add existing church members to the prayer team.
• Or click "+ Add Manually" to add someone who isn't a member.
• Assign an optional role (e.g., "Team Lead," "Intercessor") and toggle Active when needed.
Adding notes to a request
Click the 💬 icon on any prayer request to open a notes thread. Notes are timestamped and attributed to whoever wrote them — perfect for tracking follow-up calls, updates from the family, or internal ministry notes.
Closing a prayer request
When a prayer is answered or no longer needed, click the 📦 icon to close the request. Closed requests are hidden from the main list but remain in history — tick "Show Closed" to see them.

### Worship planning
Use Worship Planning to schedule services, assign worship teams, manage song libraries, and upload sheet music.
• Auto-assign worship teams to upcoming services from your roster.
• Upload song lyrics and chord charts as PDFs or Word documents.
• Drag and drop songs into a setlist.
• Notify team members of their assignments.

### Sending emails to the congregation
Use Compose Email to send messages to the whole church, a group, a single member, or event registrants.
• Open Compose Email from the General menu.
• Choose the recipient list: All Members, a specific Group, Event Registrants, or Individual.
• Type a subject and message. Format with the toolbar (bold, italic, links, images).
• Click Send. Track delivery from the Email Logs page.
Tip: Always preview before sending. The Preview button shows the email as your members will see it.

### Follow-Ups
Follow-Ups help you track action items — visitor follow-up, hospital visits, new-member check-ins, event RSVPs, prayer follow-up. Each follow-up has an owner and a due date so nothing falls through the cracks.

## Accountant Guide

### Overview
This chapter is for whoever handles your church's finances — treasurer, accountant, or bookkeeper. You'll use the Accounting section the most: Income, Expense, Pledge Campaigns, Donations, and Reports.

### Setting up your accounting categories
Before recording any income or expense, set up your categories. This makes reports clear and consistent.
Categories and subcategories
• Open Account Settings from the Accounting section.
• Click Main Sources to create top-level categories: "Tithes & Offerings," "Designated Giving," "Operating Expenses," etc.
• Inside each main source, add Subcategories (or "Funds"): General Fund, Building Fund, Missions, Youth Ministry, Rent, Utilities, etc.
• Use Transaction Types to define payment methods: Cash, Check, Credit Card, ACH/Bank Transfer.
Note: You can edit categories any time, but existing income/expense records won't change — they keep the category name they were saved with.

### Recording income (contributions)
Income covers all money coming in: tithes, offerings, designated gifts, event payments, and online donations.
Adding a single contribution
• Open Income from the Accounting section.
• Click "+ Add Income".
• Pick the contributor from the searchable dropdown — start typing their name. For one-time visitors who aren't church members, tick "Guest" and type the name.
• Choose the fund/subcategory and the date.
• Choose the transaction type (cash, check, etc.) and reference number (e.g., check number).
• Enter the amount.
• Add a note if helpful.
• Click Save.
Recurring income
For members who give the same amount on the same day every month, you can mark a contribution as Recurring. The system will create the next entry automatically.
Tip: When Stripe is connected, online donations are recorded automatically. You don't need to enter them by hand.

### Recording expenses
Expenses cover everything going out: rent, utilities, salaries, supplies, missions support, equipment.
• Open Expense from the Accounting section.
• Click "+ Add Expense".
• Enter the date, amount, and category.
• Type the vendor name (or pick from previous vendors).
• Attach a receipt by uploading a photo or PDF.
• Click Save.
Use Recurring Expense for predictable monthly bills — the system creates the entries automatically.

### Pledge Campaigns
A pledge campaign is a fundraising drive where members commit a total amount over time — building fund, missions trip, capital campaign. The system tracks who pledged, how much they've given, and how much remains.
Creating a campaign
• Open Pledges from the Accounting section.
• Click "+ New Campaign".
• Name the campaign (e.g., "Building Fund 2026").
• Choose the Subcategory (Fund). Contributions to this fund will automatically credit member pledges.
• Set a Target Amount and an optional End Date.
• Add a description so members know what they're pledging toward.
• Set Status to Active.
• Click Save.
Adding member pledges
• Open the campaign by clicking Manage Pledges.
• Click "+ Add Pledge".
• Search for the member (or type a guest name).
• Enter the pledged amount and an optional monthly cadence.
• Add notes if helpful.
• Save.
From now on, any income you record from that member, tagged to the campaign's fund, will automatically be applied to their pledge balance. You can see real-time progress on each campaign card: pledged, collected, pending, percent complete.

### Online and text donations
Once Stripe is connected (your administrator handles this), members and visitors can give online through:
• Your public donation page (linked from your website or printed bulletin).
• Recurring giving subscriptions — members can set up monthly gifts that run automatically.
• Event payments — registration fees and tickets.
• Text-to-give — donors text a code to a number and complete giving from their phone.
Every online donation appears in your Income list with a Stripe reference. Receipts are emailed to the donor automatically.

### Reports
All reports live under Accounting → Report.
Every report can be printed or downloaded as PDF/Excel.
Tip: Generate the Tax Report at year-end (January is ideal) and email statements to all giving members. They'll need it for their tax return.

### Reviewing online donations
The Donation Review page lists every online donation from Stripe with its status. Use it to:
• Verify donations posted correctly.
• Match a Stripe payout to the contributions it covered.
• Resend a receipt if a donor lost theirs.

## Volunteer Guide

### Overview
Volunteers keep the church running! This chapter shows you how to see your assignments, accept or decline requests, and update your information.

### Where to find your volunteer assignments
Once you log in, look for Volunteer in the side menu (under My Profile). This page shows:
• Upcoming events and ministries you're serving in.
• Pending requests waiting for your response.
• Your assigned role for each.

### Accepting or declining a request
When a ministry leader assigns you, you'll receive an email and a notification on your Dashboard. To respond:
• Open the Volunteer page or click the email link.
• Click Accept to confirm or Decline if you can't serve.
• Optionally add a comment explaining your decision.
Tip: Respond promptly so the team lead can find a replacement if needed. A clear "no" today is better than a no-show on the day.

### Updating your volunteer profile
Let leaders know what you're available for and when:
• Open Volunteer Profile from your profile menu.
• Tick the ministries you're interested in serving with.
• Add your availability — for example, "Sunday mornings" or "Weeknight evenings only."
• Save.

### Special roles
Kids Ministry teacher
If you serve in Kids Ministry, you'll see extra tools when you open the Kids Ministry section.
• See the roster for your classroom.
• Take attendance with a single tap.
• Check children in and out using their security code.
• Email parents about classroom news.
Prayer Team member
If you're on the prayer team, leaders can assign prayer requests directly to you. You'll see them on the Prayer Requests page filtered to "Assigned to me." You can add follow-up notes as God answers prayers.
Worship Team member
Worship volunteers see their setlists, song files, and rehearsal schedules from the Worship Planning page.

## Member Guide (My Profile)

### Overview
This chapter is for regular church members. Your member portal is your private space inside Church Genius Pro — view your profile, give online, see your contribution history, manage groups, and connect with others.

### Your Dashboard
When you log in, your Dashboard greets you with the things most relevant to your church life:
• Today's and upcoming events.
• Recent announcements from leaders.
• Quick links to your most-used pages.
• Birthdays and anniversaries — yours and your family's.
Tip: You can customise your Dashboard — drag and drop widgets to your preferred order, or hide ones you don't use. Your layout is saved automatically.

### Profile and Family
Click My Profile in the side menu to see your personal information. From here you can:
• Update your contact details (phone, email, address).
• Upload a profile photo.
• View your family members.
• See your member type and family role.
Note: Some fields may be locked — your church administrator manages them. If something is wrong, contact the church office to update.

### Contributions and Pledges
The Contributions tab in your portal shows everything you've given to the church.
Give online
• Click Give from the top of the Contributions page.
• Choose the fund you want to give to (General Fund, Building Fund, etc.).
• Enter an amount and choose either one-time or recurring monthly giving.
• Enter your card details (handled securely by Stripe).
• Click Give Now. You'll receive an emailed receipt.
View your contribution history
Below the Give section is a list of every contribution on file, with date, purpose, and amount. Filter by year using the dropdown.
My Pledges
If your church runs pledge campaigns and you've pledged, the My Pledges card shows:
• Total amount pledged.
• Amount given so far.
• Balance still pending.
• A progress bar for each campaign you're part of.
Tax statement
Need your year-end giving statement for tax purposes? Click Generate next to the Financial Report card. Choose the tax year and click Generate. A complete statement opens that you can print or save as a PDF.

### Groups
Open Groups from the side menu to see every group you belong to. Inside a group you can:
• See the member list.
• Send a message to the whole group.
• Send a private message to a single member.
• Read group announcements from leaders.

### Members Chat
Stay in touch with your church family through built-in messaging.
• Click Chat from the side menu.
• Search for a member by name.
• Start a new conversation — or join an existing group chat.
• Type your message and press Send.

### Member Directory
Need to reach someone? The Member Directory lets you search the whole congregation (with privacy controls — members who opt out of the directory won't appear). From a member's entry you can email or message them directly.

### Classes
If you teach a class — Sunday school, Bible study, discipleship — the Classes page shows your students, lesson plans, exams, and grades.

### Volunteering
See your volunteer assignments and update your interests from the Volunteer page (also covered in Chapter 5).

### Switching between accounts
If you have more than one account — for example, a personal member account and a staff account — you can switch without logging out.
• Click your profile picture in the top right.
• Choose Switch Account.
• Pick the account you want to use.

## Parents & the Kids Portal

### Overview
Church Genius Pro takes children's ministry seriously. This chapter covers the Kids Ministry features for parents, the public check-in screen at the church, and the Kids Portal for older children who are assigned classes and exams.

### Registering your child
Before your child can check into Sunday school or kids ministry events, they need to be registered.
• Ask your church administrator or kids ministry coordinator to add them, OR open Kids Ministry → Children → "+ Add Child" if you have access.
• Enter your child's first and last name, date of birth, gender, and grade.
• Add any allergies or medical notes — leaders need to know.
• Link the child to your family if you're already a member.
• Save.

### Checking your child in at church
Most churches use a self-service tablet or kiosk at the door for kids check-in. Here's how it works:
• Walk up to the check-in tablet or scan the QR code with your phone.
• Enter your phone number — the same one your child is registered with.
• You'll see your child(ren) on the next screen. Tap each child to check them in.
• A security code prints (or appears on your phone). Keep it — you'll need it to pick them up after class.
Note: Children are auto-assigned to a classroom based on age or grade. If you want a different classroom, talk to the kids ministry leader.

### Picking your child up
• Return to the check-in station after the service.
• Show the security code or scan your code on your phone.
• The kids ministry volunteer hands your child back.
Tip: If you've lost the security code, the volunteer can look it up by your name. Bring photo ID just in case.

### The Kids Portal (for older children)
Children old enough to log in can have their own account with the "Child" role. The Kids Portal is a safe, simplified version of the app designed just for them. From it they can:
• See their classes.
• Take exams uploaded by their teacher.
• View grades and progress.
• Earn badges for completing lessons.
• Play Bible-related games in the Activity Corner.
Note: A child's portal hides adult features like giving, contributions, and member directory. Parents can request progress reports from teachers.

### Sunday School / Lessons
If your church runs a structured Sunday school programme, teachers can:
• Upload lesson PDFs or Word documents.
• Generate exam questions automatically from those lessons.
• Auto-grade student answers.
• Send parents progress updates.

### Alerts for parents
Parents receive automatic notifications for:
• Check-in confirmation.
• Pickup reminders.
• Upcoming lessons or exams.
• Important announcements from the kids ministry team.

## Communication & Reminders

### Overview
Good communication keeps your church family informed and engaged. Church Genius Pro provides email, SMS, push notifications, and scheduled reminders, all from one place.

### Compose Email
We covered this briefly in Chapter 3. To send an email to any group of people:
• Open Compose Email from the General menu.
• Pick recipients: All Members, a Group, Event Registrants, or Individuals.
• Type your subject and message. Use the formatting toolbar for bold, italics, links, and images.
• Preview, then click Send.

### Event Reminders
Event reminders go out automatically before, on the day of, and after every event so attendees don't forget.
Configuring event reminder timing
• Open Reminders → Event Reminders.
• Pick how long before the event the first reminder goes out (e.g., 7 days, 1 day).
• Choose whether to send a "today's the day" reminder.
• Optionally enable a thank-you-for-coming follow-up.
• Save. Every future event will follow this schedule unless you override it on the event itself.

### Periodic Reminders
Periodic reminders are recurring automated messages — birthday wishes, anniversary greetings, monthly statements, holiday emails, weekly meeting reminders.
• Open Reminders → Periodic Reminders.
• Pick a reminder type from the list (Birthday, Anniversary, Christmas, Thanksgiving, Monthly Statement, etc.).
• Customise the email or SMS template.
• Choose the send time (e.g., 6:00 AM on the recipient's birthday).
• Save and enable.

### One-Time Reminders
Schedule a single reminder for a specific date and time — for example, a special service or a one-off announcement.
• Open Reminders → One-time Reminders.
• Click "+ Add One-time Reminder".
• Pick a date, time, and recipient list.
• Type the message.
• Save.

### Push notifications
If a member has installed Church Genius Pro on their phone (via the "Add to Home Screen" prompt), they'll receive push notifications for reminders, event check-ins, and prayer assignments. Members can manage their own notification preferences in My Profile → Settings.

### Event Calendar
Open Event Calendar from the General menu to see everything happening at your church, in three views:
• Yearly — long-range planning view.
• Monthly — the most common view, shows the next 30 days at a glance.
• Weekly — detailed schedule for the week.
The calendar shows events, meetings, birthdays, and anniversaries together. Click any item for full details.

## System Administrator Tools

### Overview
This chapter is for whoever manages the Church Genius Pro platform itself — possibly hosting multiple churches, configuring backups, or loading demo data. These pages are accessed from the Service Admin portal at /serviceadminhome.

### Registering a new church client
• Sign in to the Service Admin portal.
• Click "+ Register New Client".
• Enter the church name, the administrator's name and email, and contact details.
• Save. A Client ID is generated automatically and a database is provisioned.
• The new church administrator receives an email with their login link.

### Database Backup Configuration
Backups protect your data from loss. Configure them once and forget about them.
• Open Database Backup Configuration on the Service Admin home page.
• Choose a backup interval: every 1, 3, 6, 9, or 12 months — or Disabled for manual backups only.
• Choose which tables to back up: All Tables (recommended) or a custom selection.
• Optionally add an email address that should be notified after each backup runs.
• Click Save Backup Settings.
Running a backup right now
Click ▶ Run Backup Now to trigger an immediate backup without waiting for the schedule.
Restoring from a backup
If you ever need to roll back, click Restore from Backup, pick a backup date, and confirm. This action cannot be undone, so use with care.

### Loading test / demo data
Useful for training, demos, or testing new features without touching real data. The Test Data loader creates a fresh demo church with sample members, families, contributions, events, ministries, kids ministry data, and pledge campaigns.
Loading test data
• On the Service Admin home page, scroll to the 🧪 Test / Demo Data card.
• Click Load Test Data.
• Confirm. A new demo tenant is created (Client ID starts with DEMO-).
• The Test Data card shows a credentials table with usernames and passwords for every role: Church, SuperAdmin, Admin, Accountant, and Member.
Note: Click any credential cell to copy it to the clipboard. Each generated password is random and unique. Demo credentials remain visible on the page even after refresh.
Clearing test data
• In the Test / Demo Data card, pick a tenant from the Existing Demo Tenants dropdown.
• Click Clear Selected.
• Confirm. Every row belonging to that demo client is deleted.
Tip: Demo data is fully isolated from real church data. You can run demos all day without affecting any real church account.

## Tips & Best Practices

### Overview
A few suggestions to help your church get the most out of Church Genius Pro.

### For administrators
• Set up your accounting categories before recording the first contribution. It saves cleanup later.
• Use the standard roles where possible. Only customise permissions for users who need an exception.
• Schedule recurring reminders for birthdays and anniversaries — small touches that members notice.
• Run the Tax Report in January and email statements to every giving member.
• Keep your member directory clean by marking inactive members as "Inactive" rather than deleting — you preserve history.

### For pastors and ministry leaders
• Use Follow-Ups to track new visitors. A well-timed phone call dramatically improves visitor-to-member conversion.
• When assigning prayer requests, add a closing note when the request is answered. Members love seeing how God moved.
• Build your event volunteer roster from existing members where possible — they're already in the directory and easy to reach.
• Preview every email before sending. Typos and broken links are the most common feedback complaint.

### For accountants
• Record contributions weekly, not monthly. Members notice incorrect totals on their statements.
• Attach receipts to expenses immediately. Searching for them later is painful.
• Reconcile online donations with Stripe payouts monthly using the Transaction Report.
• Use Pledge Campaigns for any fundraising drive — donors love seeing the progress bar.

### For members
• Set up recurring online giving and forget about writing checks.
• Update your contact info whenever you move or change phones — keeps the directory accurate.
• Customise your Dashboard so the things you care about are at the top.
• Subscribe to push notifications so you don't miss events.

### For everyone
• Always log out on a shared device.
• Use a strong password and don't share it.
• If a feature doesn't work the way you expect, check with your administrator — you may not have the required permission.

## Appendix A — Glossary

### Appendix A — Glossary
Quick reference for terms used throughout this manual and the application.

## Appendix B — Technology Stack

### Overview
This appendix is for IT-minded readers. Most users can safely skip it. Church Genius Pro is built on a modern, secure, and scalable technology stack.

### Backend
• Spring Boot — the application framework that handles all the server-side logic.
• Spring Security — authentication, session management, and access control.
• Hibernate / JPA — how the application talks to the database.
• PostgreSQL — the database where all your church's data is stored. (MySQL is also supported.)

### Frontend
• Modern HTML, CSS, and JavaScript with progressive enhancement.
• Responsive design — works on phones, tablets, and desktops without a separate app.
• Optional native-feel installation through "Add to Home Screen" (PWA).

### Integrations
• Stripe — for online donations, event payments, and recurring giving.
• Email and SMS services — for transactional emails, reminders, and notifications.
• QR Code generation — for event check-in, kids ministry pickup codes, and public screen links.
• PDF / Excel reporting — for tax statements, financial reports, and member exports.

### Security
• Role-based access control — only authorised users see sensitive data.
• Encrypted session cookies and automatic timeout after 30 minutes of inactivity.
• Database backups on a configurable schedule, optionally to cloud storage.
• Stripe handles all card data — Church Genius Pro never stores credit card numbers.

### Scalability
The platform supports churches of all sizes, from house churches to multi-campus mega-churches with tens of thousands of members. Multi-tenancy keeps each church's data isolated.

## Appendix C — Getting Help

### Overview
If you ever get stuck, help is close at hand.

### Inside the app
• Click Help in the side menu for searchable documentation, video tutorials, and FAQs.
• Most pages have a small "?" icon next to important controls — hover for a quick tip.

### From your church administrator
Your administrator is the first stop for: permission requests, account problems, forgotten passwords (they can reset yours), and questions about church-specific settings.

### From the support team
For technical problems your administrator can't solve — bugs, login failures, missing features — your administrator can contact the Church Genius Pro support team on your behalf.

### Quick troubleshooting
Thank you for using Church Genius Pro!
We hope this platform helps your church flourish.
## Pricing (as of 2026)
Plans (monthly, per church): Free $0 — up to 50 people, 10 giving transactions/mo, 30 emails + 10 SMS/mo, 3 staff portals, 2 meetings/mo, basic events & groups, Help Center. Standard $15/mo ("Most Popular", regular value $50) — everything in Free plus up to 200 people, 30 giving transactions/mo, 3 staff + 3 kids + 3 child portals, full events/registration/calendar, event & kids check-in, kids ministry & Sunday School, worship planning & song book, attendance, follow-ups, volunteers, member directory, in-app chat, certificates, reminders, 30 SMS/mo. Pro $25/mo ("Includes AI", regular value $75) — everything in Standard plus unlimited people/giving/portals, AI features, 100 SMS/mo, NFC & barcode login, private pages, pledges, full public screens, unlimited meetings.
Add-ons: Accounting Module +$10/mo (income, expenses, financial reports). Advanced Accounting with AI +$25/mo (AI-assisted accounting, check scanning, payroll, pledges, bank statement import, bank sync, advanced reporting). Extra SMS $1.50 per 100.
Every paid plan: 1-month free trial, free migration support. Free plan needs no credit card.

## Contact
Questions, sales, migration or support: support@churchgeniuspro.com (replies within one business day) or the Contact form at /contact. YouTube tutorials: https://www.youtube.com/@ChurchGeniusPro. Full documentation: /help on the website.
`;

module.exports = { KNOWLEDGE_BASE };
