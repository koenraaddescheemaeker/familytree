import FavoriteButton from './FavoriteButton';
import SectionNotes from './SectionNotes';

interface UserSectionToolsProps {
  sectionId: string;
  sectionName: string;
}

const UserSectionTools = ({ sectionId, sectionName }: UserSectionToolsProps) => {
  return (
    <div className="flex items-center gap-1">
      <FavoriteButton sectionId={sectionId} sectionName={sectionName} />
      <SectionNotes sectionId={sectionId} sectionName={sectionName} />
    </div>
  );
};

export default UserSectionTools;
