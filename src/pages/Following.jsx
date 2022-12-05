import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import ProfileListItem from "../components/ProfileListItem"

export default function Following() {
	const { userId } = useParams()

	const [profile, setProfile] = useState(null)
	const [following, setFollowing] = useState([])

	useEffect(() => {
		const getProfile = async () => {
			const docRef = doc(db, "users", userId)
			const docSnap = await getDoc(docRef)
			setProfile(docSnap.data())
		}

		getProfile()
	}, [])

	useEffect(() => {
		if (!profile) return
        setFollowing([])

		const getFollowing = () => {
			profile.following.map(async (item) => {
				const docRef = doc(db, "users", item)
				const docSnap = await getDoc(docRef)
                setFollowing(prev => [...prev, docSnap.data()])
			})
		}

		getFollowing()
	}, [profile])


	return (
		<div className="following">
			<h1>{profile?.displayName} following</h1>
			{following ? (
				following.map((item) => (
					<Link
						to={`/user/${item.uid}`}
						key={item.uid}
					>
						<ProfileListItem item={item}/>
					</Link>
				))
			) : (
				<h1>This user follows no one</h1>
			)}
		</div>
	)
}
