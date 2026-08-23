Read AGENTS.md first and follow it strictly.

Implement the Sign Up screen exactly as shown in the attached design. Then create a matching Sign In screen using the same layout and visual style, but with sign-in copy and no password field. Both screens should use email and social auth UI only.

Update onboarding so pressing Get Started navigates to the Sign Up screen.

When the email Sign Up or Sign In action is pressed, show a verification modal saying the user has received an email and should enter the verification code. Keep social-auth actions separate: each social-auth button should initiate its provider flow, or be clearly marked as a non-functional placeholder, and must not open the email verification modal.

The code should be 6 digits and use the number pad. Keep the modal above the keyboard. When the last digit is entered, submit the code through Clerk and navigate to the home route (/) only after successful verification. If Clerk rejects the code, keep the user in the modal and display the verification error.
[alt text](../prompt_material/03-auth-screen.png)
