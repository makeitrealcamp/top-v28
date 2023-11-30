import { Alert } from '@/components';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  // const [showAlert, setShowAlert] = useState(true)
  return (
    <>
      <h2>Users Page</h2>
      <Alert />
      <table className="table-auto">...</table>
    </>
  );
}
