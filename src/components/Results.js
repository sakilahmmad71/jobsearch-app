import React, { useContext } from 'react';
import JobsContext from '../context/jobs';
import JobItem from './JobItem';

const Results = () => {
    const { results } = useContext(JobsContext);
    return (
        <div className="search-results">
            {results.map((job, index) => (
                <JobItem key={job.id} {...job} index={index} />
            ))}
        </div>
    );
};

export default Results;
