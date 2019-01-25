package com.dancekvartal.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dancekvartal.app.domain.Lesson;
import com.dancekvartal.app.service.LessonService;
import com.dancekvartal.app.web.rest.errors.BadRequestAlertException;
import com.dancekvartal.app.web.rest.util.HeaderUtil;
import com.dancekvartal.app.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lesson.
 */
@RestController
@RequestMapping("/api")
public class LessonResource {

    private final Logger log = LoggerFactory.getLogger(LessonResource.class);

    private static final String ENTITY_NAME = "lesson";

    private final LessonService lessonService;

    public LessonResource(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    /**
     * POST  /lessons : Create a new lesson.
     *
     * @param lesson the lesson to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lesson, or with status 400 (Bad Request) if the lesson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lessons")
    @Timed
    public ResponseEntity<Lesson> createLesson(@Valid @RequestBody Lesson lesson) throws URISyntaxException {
        log.debug("REST request to save Lesson : {}", lesson);
        if (lesson.getId() != null) {
            throw new BadRequestAlertException("A new lesson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lesson result = lessonService.save(lesson);
        return ResponseEntity.created(new URI("/api/lessons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lessons : Updates an existing lesson.
     *
     * @param lesson the lesson to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lesson,
     * or with status 400 (Bad Request) if the lesson is not valid,
     * or with status 500 (Internal Server Error) if the lesson couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lessons")
    @Timed
    public ResponseEntity<Lesson> updateLesson(@Valid @RequestBody Lesson lesson) throws URISyntaxException {
        log.debug("REST request to update Lesson : {}", lesson);
        if (lesson.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lesson result = lessonService.save(lesson);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lesson.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lessons : get all the lessons.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of lessons in body
     */
    @GetMapping("/lessons")
    @Timed
    public ResponseEntity<List<Lesson>> getAllLessons(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Lessons");
        Page<Lesson> page;
        if (eagerload) {
            page = lessonService.findAllWithEagerRelationships(pageable);
        } else {
            page = lessonService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/lessons?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /lessons/:id : get the "id" lesson.
     *
     * @param id the id of the lesson to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lesson, or with status 404 (Not Found)
     */
    @GetMapping("/lessons/{id}")
    @Timed
    public ResponseEntity<Lesson> getLesson(@PathVariable Long id) {
        log.debug("REST request to get Lesson : {}", id);
        Optional<Lesson> lesson = lessonService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lesson);
    }

    /**
     * DELETE  /lessons/:id : delete the "id" lesson.
     *
     * @param id the id of the lesson to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lessons/{id}")
    @Timed
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        log.debug("REST request to delete Lesson : {}", id);
        lessonService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
