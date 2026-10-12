export type VerifiedDocument = {title: string; imageSrc: string; alt: string};
export type VerifiedTeamMember = {name: string; role: string; qualifications: string; bio: string; imageSrc: string};

// TODO(business): Populate only with real authorization scans supplied and verified by Volmer.
export const verifiedDocuments: VerifiedDocument[] = [];
// TODO(business): Populate only with confirmed identities, roles, qualifications and original photos.
export const verifiedTeam: VerifiedTeamMember[] = [];
