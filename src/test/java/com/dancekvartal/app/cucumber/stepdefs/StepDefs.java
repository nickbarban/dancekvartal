package com.dancekvartal.app.cucumber.stepdefs;

import com.dancekvartal.app.DancekvartalApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DancekvartalApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
