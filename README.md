1. Added dark theme + themeProvider
2. Added required components from shadcn ui
3. /layout.js is for re-usable components to be seen for all pages
4. /page.js is for the main page
5. Header and footer added
6. Added Clerk for authentication
7. Added proxy.js for Clerk
8. Added ClerkProvider in layout.js
9. Added ClerkMiddleware in proxy.js
10. Added ClerkSignInButton and ClerkSignUpButton in Header.jsx
11. Generated all landing page content
12. Create Hero image
13. Added logo navigation
14. Created postgresql database using NeonDB
15. Added database connection in .env
16. to add weekly updated industy insights - inngest
17. Prisma imported and added schema for user, assessment, resume, coverletter, industryinsight
18. added not-found page customized
19. added onboarding page
20. added industries.js file
21. created actions folder for APIs
22. created /dashboard and /onboarding routes and added logic according to user existance
23. Using react hook form and zod form for craeting onboarding form -  npm i react-hook-form zod @hookform/resolvers
24. creating onboardingschema file for onboardingform so that users fill his details correctly
25. Creating a custom hook use-fetch to handle the updateUser and states of data i.e data , loading and error
26. Onboarding form complete and user data is added on neon db and user is directed to /dashboard
27. working on creating industry insights from gemini API.
28. to work with gemini API - npm i @google/generative-ai and used model: "gemini-2.5-flash"
29. working on dashboard to show industry insights - added react-spinner for button loading spinner
30. AI insights generated from gemini , now we require to show them in chart forms , so we install - npm i recharts
31. to handle dates inside projects we use - npm i date-fns
32. Completed the industry insights dashboard with recharts and adding skills and insights
33. Now to update the insigts every week we need to configure inngest functions
34. complete interview section with quiz taking , quiz result , and quiz dashboard( interview dashboard)
35. enhanced UI with AI for /onboarding , /dashboard , /interview
36. working on /resume , TO BE DONE : add AI rewrite for summary input
37. using - npm i @uiw/react-md-editor to edit markdown file and npm i html2pdf to convert into pdf for resume builder
38. mistakenly installed pdf2html , remove that from dependencies 