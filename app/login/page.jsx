import { signIn, signOut, auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Authenticate() {
  const session = await auth();
  console.log(session);

  const user = session?.user;

  console.log(session);
  return (
    <div className=" text-white w-full h-screen flex flex-col justify-center items-center ">
      <h1>{session?.user.email}</h1>
      {user ? (
        <form
          action={async () => {
            'use server';

            await signOut();
          }}
        >
          <button type="submit" className="bg-red-400 px-4 py-2 rounded-md">
            Sign Out
          </button>
          <br />
        </form>
      ) : (
        <form
          action={async () => {
            'use server';

            await signIn('google', { redirectTo: '/' });
          }}
        >
          <div className="bg-gray-200 w-full h-auto p-5 rounded-md flex flex-col  gap-20  justify-center h-screen dark:bg-gray-800">
            <h1 className="text-black text-6xl">Please Login</h1>
            <button className="bg-white px-4 py-3 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>
          <br />
        </form>
      )}
    </div>
  );
}
