import { getUserPSF } from './lib/SFs/PSFs/authPSFs';
import { LoginMdBtn } from '@/app/components/root/LoginMdBtn';
import { LogoutButton } from '@/app/components/root/LogoutButton';

const RootPage = async() => {
  const user = await getUserPSF();

  return (
    <main>
      {user
      ? <LogoutButton />
      : <LoginMdBtn />}
    </main>
  );
}
export default RootPage;