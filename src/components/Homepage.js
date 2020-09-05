import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { initiateGetJobs } from '../actions/jobs';
import { resetErrors } from '../actions/errors';
import JobsContext from '../context/jobs';

import Header from './Header';
import Search from './Search';
import Results from './Results';
import JobDetails from './JobDetails';
import Loader from './Loader';

const Homepage = (props) => {
    const [results, setResults] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const [jobId, setJobId] = useState(-1);
    const [page, setPage] = useState('home');

    const [pageNumber, setPageNumber] = useState(1);
    const [selection, setSelection] = useState(null);

    const [hideLoadMore, setHideLoadMore] = useState(false);

    useEffect(() => {
        setResults(props.jobs);
    }, [props.jobs]);

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    const loadJobs = (selection) => {
        const { dispatch } = props;
        const { description, location, full_time, page = 1 } = selection;

        let isLoadMore = false;
        if (selection.hasOwnProperty('page')) {
            isLoadMore = true;
        }

        dispatch(resetErrors);
        setLoading(true);
        dispatch(initiateGetJobs({ description, location, full_time, page }, isLoadMore))
            .then((response) => {
                if (response && response.jobs.length === 0) {
                    setHideLoadMore(true);
                } else {
                    setHideLoadMore(false);
                }
                setLoading(false);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleItemClick = (jobId) => {
        setPage('details');
        setJobId(jobId);
    };

    const handleResetPage = () => {
        setPage('home');
    };

    const handleSearch = (selection) => {
        loadJobs(selection);
        setSelection(selection);
    };

    const handleLoadMore = () => {
        loadJobs({ ...selection, page: pageNumber + 1 });
        setPageNumber(pageNumber + 1);
    };

    let jobDetails = {};

    if (page === 'details') {
        jobDetails = results.find((job) => job.id === jobId);
    }

    const value = {
        results,
        details: jobDetails,
        onSearch: handleSearch,
        onItemClick: handleItemClick,
        onResetPage: handleResetPage,
    };

    return (
        <JobsContext.Provider value={value}>
            <Loader show={loading}>Loading...</Loader>
            <div>
                <div className={`${page === 'details' && 'hide'}`}>
                    <div className="container">
                        <Header />
                        <Search />
                        {!_.isEmpty(errors) && (
                            <div className="errorMsg">
                                <p>{errors.error}</p>
                            </div>
                        )}
                        <Results />
                        {results.length > 0 && _.isEmpty(errors) && !hideLoadMore && (
                            <div className="load-more" onClick={loading ? null : handleLoadMore}>
                                <button
                                    disabled={loading}
                                    className={`${loading ? 'disabled' : ''}`}
                                >
                                    Load More Jobs
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`${page === 'home' && 'hide'}`}>
                    {page === 'details' && <JobDetails />}
                </div>
            </div>
        </JobsContext.Provider>
    );
};

const mapsStateToProps = (state) => ({
    jobs: state.jobs,
    errors: state.errors,
});

export default connect(mapsStateToProps)(Homepage);
