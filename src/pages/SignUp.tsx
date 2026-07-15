import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa6';

interface SignUpForm {
  churchName: string;
  pastorName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  churchSize: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  newsletter: boolean;
}

const perks = [
  'Free version available — no credit card required',
  '1-month free trial of every paid plan',
  'Free migration support from your current system',
  'AI assistant that does the typing for you',
  'Secure role-based access from day one',
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Ghana', 'Nigeria', 'Kenya',
  'South Africa', 'India', 'Philippines', 'Brazil', 'Mexico', 'Germany', 'France', 'Other',
];

const churchSizes = ['1–50 members', '51–150 members', '151–500 members', '501–1,500 members', '1,500+ members'];

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpForm>();

  const password = watch('password');

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-white to-white" aria-hidden="true" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:pt-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Create your account
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Your church, <span className="gradient-text">effortlessly organized</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Set up your church in minutes. No technical background or church-software experience
              needed.
            </p>
            <ul className="mt-8 space-y-4">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  </span>
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500">
              Already have an account?{' '}
              <a href="https://app.churchgeniuspro.com/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Log in here
              </a>
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isSubmitSuccessful ? (
              <div className="glass rounded-3xl p-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Welcome aboard! 🎉</h2>
                <p className="mt-3 text-slate-600">
                  Your account is being created. Check your email to verify your address and start
                  your free trial.
                </p>
                <Link to="/" className="btn-primary mt-8">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form
                className="glass space-y-4 rounded-3xl p-6 sm:p-8"
                onSubmit={handleSubmit(() => {
                  /* Wire to your registration API */
                })}
                noValidate
              >
                {/* Social sign in */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50"
                  >
                    <FaGoogle className="h-4 w-4 text-[#4285F4]" aria-hidden="true" /> Sign up with Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/50"
                  >
                    <FaMicrosoft className="h-4 w-4 text-[#00A4EF]" aria-hidden="true" /> Sign up with Microsoft
                  </button>
                </div>
                <div className="flex items-center gap-3 py-1">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    or with email
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div>
                  <label htmlFor="churchName" className="label">Church Name *</label>
                  <input
                    id="churchName"
                    className="input"
                    autoComplete="organization"
                    aria-invalid={!!errors.churchName}
                    {...register('churchName', { required: 'Church name is required' })}
                  />
                  {errors.churchName && <p className="mt-1 text-xs text-rose-600">{errors.churchName.message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pastorName" className="label">Pastor Name *</label>
                    <input
                      id="pastorName"
                      className="input"
                      aria-invalid={!!errors.pastorName}
                      {...register('pastorName', { required: 'Pastor name is required' })}
                    />
                    {errors.pastorName && <p className="mt-1 text-xs text-rose-600">{errors.pastorName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contactPerson" className="label">Contact Person *</label>
                    <input
                      id="contactPerson"
                      className="input"
                      autoComplete="name"
                      aria-invalid={!!errors.contactPerson}
                      {...register('contactPerson', { required: 'Contact person is required' })}
                    />
                    {errors.contactPerson && (
                      <p className="mt-1 text-xs text-rose-600">{errors.contactPerson.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="signup-email" className="label">Email *</label>
                    <input
                      id="signup-email"
                      type="email"
                      className="input"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      className="input"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="country" className="label">Country *</label>
                    <select
                      id="country"
                      className="input"
                      autoComplete="country-name"
                      aria-invalid={!!errors.country}
                      {...register('country', { required: 'Required' })}
                    >
                      <option value="">Select…</option>
                      {countries.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-xs text-rose-600">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="label">State / Region *</label>
                    <input
                      id="state"
                      className="input"
                      autoComplete="address-level1"
                      aria-invalid={!!errors.state}
                      {...register('state', { required: 'Required' })}
                    />
                    {errors.state && <p className="mt-1 text-xs text-rose-600">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="label">City *</label>
                    <input
                      id="city"
                      className="input"
                      autoComplete="address-level2"
                      aria-invalid={!!errors.city}
                      {...register('city', { required: 'Required' })}
                    />
                    {errors.city && <p className="mt-1 text-xs text-rose-600">{errors.city.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="churchSize" className="label">Church Size *</label>
                  <select
                    id="churchSize"
                    className="input"
                    aria-invalid={!!errors.churchSize}
                    {...register('churchSize', { required: 'Please select your church size' })}
                  >
                    <option value="">Select your church size…</option>
                    {churchSizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.churchSize && <p className="mt-1 text-xs text-rose-600">{errors.churchSize.message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="label">Password *</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input pr-11"
                        autoComplete="new-password"
                        aria-invalid={!!errors.password}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: { value: 8, message: 'At least 8 characters' },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="label">Confirm Password *</label>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="input"
                      autoComplete="new-password"
                      aria-invalid={!!errors.confirmPassword}
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (v) => v === password || 'Passwords do not match',
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-rose-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      aria-invalid={!!errors.agreeTerms}
                      {...register('agreeTerms', { required: 'You must accept the terms to continue' })}
                    />
                    <span>
                      I agree to the{' '}
                      <Link to="/terms" className="font-semibold text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="font-semibold text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      *
                    </span>
                  </label>
                  {errors.agreeTerms && <p className="text-xs text-rose-600">{errors.agreeTerms.message}</p>}
                  <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      {...register('newsletter')}
                    />
                    <span>Send me product updates, tips, and church-management resources</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full !py-4 !text-base">
                  Create Account
                </button>
                <p className="text-center text-xs text-slate-400">
                  Free forever plan · 1-month free trial on paid plans · Cancel anytime
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
