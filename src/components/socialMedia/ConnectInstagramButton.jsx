import axios from "axios";

const ConnectInstagramButton = () => {

    const token = JSON.parse(localStorage.getItem('auth'))?.token;
  const handleConnect = () => {
    const redirectUri = encodeURIComponent('http://localhost:5000/api/v1/instagram/callback');
    const clientId = import.meta.env.VITE_META_APP_ID;
    const token = JSON.parse(localStorage.getItem('auth'))?.token;

    if (!token) {
      alert("User not authenticated. Please login first.");
      return;
    }

    // Full Meta permissions (you can reduce later if needed)
    const scopes = [
      'pages_show_list',
      'pages_read_engagement',
      'pages_read_user_content',
      'instagram_basic',
      'instagram_manage_insights',
      'instagram_content_publish',
      'business_management',
      'ads_management',
      'public_profile'
    ].join(',');

    const url = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&state=${token}`;

    window.location.href = url;
  };

  const getAccountInfo = async () =>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/instagram/account-info`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <button
      onClick={handleConnect}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Connect Instagram
    </button>
    <button
      onClick={getAccountInfo}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Get UserInfo
    </button>
  </>
  );
};

export default ConnectInstagramButton;