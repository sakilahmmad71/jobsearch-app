import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import JobsContext from '../context/jobs';
import Image from './Image';

const JobDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { details, onResetPage } = useContext(JobsContext);

    const {
        type,
        title,
        description,
        location,
        company,
        company_url,
        company_logo,
        how_to_apply,
    } = details;

    return (
        <div className="job-details">
            <div className="basic-link">
                <a href="/#" onClick={onResetPage}>
                    <Button variant="outline-info">&lt;&lt; Back to results</Button>
                </a>
            </div>
            <div className="mt-2">
                {type} | {location}
            </div>
            <div className="main-section">
                <div className="left-section">
                    <div className="title">{title}</div>
                    <hr />
                    <div
                        className="jod-description mt-2"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                </div>
                <div className="right-section">
                    <div className="company-details">
                        <h3>About company</h3>
                        <Image src={company_logo} alt={company} className="company-logo" />
                        <div className="company-name">{company}</div>
                        <a href={company_url} className="company-url">
                            {company_url}
                        </a>
                    </div>
                    <div className="how-to-apply">
                        <h3>How to apply</h3>
                        <div dangerouslySetInnerHTML={{ __html: how_to_apply }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
